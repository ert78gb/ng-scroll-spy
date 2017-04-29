ng-scroll-spy directive
======================

This directive automatically and and remove .active css class to the link base on the document scroll position.
The directive use the href tag to find the corresponding HTML element. If the corresponding element close to the top of document that will be .active.

The navigation menu
```html
<nav>
  <ul class="menu" scroll-spy>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
    <li>
      <a href="#other1">Other1</a>
    </li>
  </ul>
</nav>
```

Somewhere in the content

```html
<h1 id="about">About</h1>
...
<h1 id="contact">Contact</h1>
...
<h1 id="other1">Other1</h1>

```
