import {AfterContentInit, Directive, ElementRef, HostListener, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {extractElementPosition} from 'ng-html-util';

@Directive({
  selector: '[scroll-spy]'
})
export class ScrollSpyDirective implements AfterContentInit {

  private elements = [];
  private currentActiveLink;
  private directNavigation = false;

  constructor(@Inject(DOCUMENT) private document: Document,
              private el: ElementRef,
              private renderer: Renderer2) {
  }

  public ngAfterContentInit(): void {
    this.collectIds();
  }

  private collectIds(): void {
    this.elements = [];
    let elements = this.el.nativeElement.querySelectorAll('a');

    for (let i = 0; i < elements.length; i++) {
      let elem = elements.item(i);

      let id = ScrollSpyDirective.getId(elem);
      if (!id)
        continue;

      let destination = this._getPeerElement(id);

      if (!destination)
        continue;

      elem.addEventListener('click', this._onLinkClicked.bind(this));

      this.elements.push({
        id,
        link: elem,
        destination
      })
    }
  }

  private _onLinkClicked(event: Event):  void {
    event.preventDefault();

    let target = event.currentTarget;
    let id = ScrollSpyDirective.getId(target);
    let destination = this._getPeerElement(id);
    this.directNavigation = true;

    let position = extractElementPosition(this.document, destination);

    window.scrollTo({top: position.top - 25, left: 0, behavior: 'smooth'});

    this._cleanCurrentLink();
    this._setCurrentLink(target);
    this.directNavigation = false;
  }

  private _getPeerElement(id): HTMLElement | null {

    let destination = this.document.getElementById(id);

    if (!destination)
      return null;

    return destination;
  }

  private static getId(elem): string {
    let href = elem.getAttribute('href');

    if (!href)
      return null;

    return href.replace('#', '');
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event: Event): void {
    if (this.directNavigation)
      return;

    for (let elem of this.elements) {
      let top = elem.destination.getBoundingClientRect().top;
      if (top > 0 && top < 25) {
        this._cleanCurrentLink();
        this._setCurrentLink(elem.link);
        break;
      }
    }
  }

  private _cleanCurrentLink(): void {
    if (!this.currentActiveLink)
      return;

    this.renderer.removeClass(this.currentActiveLink, 'active');
  }

  private _setCurrentLink(elem): void {
    this.currentActiveLink = elem;
    this.renderer.addClass(this.currentActiveLink, 'active');
  }
}
