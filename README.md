# vue3-router-prefetch

[![NPM version](https://badgen.net/npm/v/vue3-router-prefetch)](https://npmjs.com/package/vue3-router-prefetch) [![NPM downloads](https://badgen.net/npm/dm/vue3-router-prefetch)](https://npmjs.com/package/vue3-router-prefetch)

## Features

- Pull resources ahead of time when links appear in view.
- Pull resources ahead of time when the mouse is overlaid on the link.
- You don't need to change your code base to make it work.
- Tiny-size.

## Install

```bash
yarn add vue3-router-prefetch
```

## Usage

You need to use this plugin after `vue-router`:

```js
import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import RouterPrefetch from 'vue3-router-prefetch'

const app = createApp()
const router = createRouter()
app.use(router)
app.use(RouterPrefetch)
```

Then you can use `<router-link>` without any changes, when this component is visible in viewport, it will automatically prefetch the (async) route component.

You can also register it as a new component instead of overriding `<router-link>`:

```js
app.use(RouterPrefetch, {
  componentName: 'QuickLink',
})
```

Now you can use it as `<quick-link>` in your app.

## Browser Support

- [Support situation](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

## Props

All [props](https://router.vuejs.org/api/#router-link-props) of `<router-link>` are still available, additional props are listed below.

### type

- Type: `'view' | 'hover' | 'none'`
- Default: `hover`

How to pull resources in advance.

It can also be defined globally:

```js
app.use(RouterPrefetch, {
  type: 'view',
})
```

### timeout

- Type: `number`
- Default: `2000` (ms)

Timeout after which prefetching will occur.

<!-- ## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**vue3-router-prefetch** © EGOIST, Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/vue3-router-prefetch/contributors)).

> [Website](https://egoist.sh) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@\_egoistlily](https://twitter.com/_egoistlily) -->
