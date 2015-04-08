<h1 class="leader-0" id="overview">JavaScript</h1>

Calcite Web includes a small JavaScript library. `calcite-web.js` is a lightweight and dependency-free library made to enable interactive behaviors for certain [patterns](../patterns/) and [components](../components).

Currently, the following components and patterns rely on `calcite-web.js`:

- [Dropdowns](../components/#dropdowns)
- [Modals](../patterns/#modals)
- [Tabs](../patterns/#tabs)
- [Accordions](../patterns/#accordions)
- [Carousels](../patterns/#carousel)
- [Drawers](../patterns/#drawers)
- [Expanding Nav](../patterns/#expanding-nav)

To use `calcite-web.js` simply [include a reference to it in your html](../patterns#basic-html-page) and then run the `calcite.init()` method. For example, say your JavaScript was located in a file called `script.js`. You can bind all the JavaScript patterns from `script.js` like this:

```js
// On document ready
window.onload = function () {
  // Initialize all calcite.js patterns
  calcite.init();
};
```