import {NgModule} from '@angular/core';
import {polyfill as smoothscroll} from 'smoothscroll-polyfill';

import {ScrollSpyDirective} from './directives/ng-scroll-spy.directive';

export * from './directives/ng-scroll-spy.directive';

@NgModule({
  declarations: [ScrollSpyDirective],
  exports: [ScrollSpyDirective]
})
export class ScrollSpyModule {
  constructor(){
    smoothscroll();
  }
}
