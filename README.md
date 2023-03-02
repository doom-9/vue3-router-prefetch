# vue3-router-prefetch

[![NPM version](https://badgen.net/npm/v/vue3-router-prefetch)](https://npmjs.com/package/vue3-router-prefetch)
[![NPM downloads](https://badgen.net/npm/dm/vue3-router-prefetch)](https://npmjs.com/package/vue3-router-prefetch)

## Features

- Get asynchronous resources ahead of time in the way you configure them.
- You don't need to change your code to use this tool.

## Install

```bash
yarn add vue3-router-prefetch
```

## Usage

You need to use this plugin after `vue-router`:

```js
import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import Vue3RouterPrefetch from 'vue3-router-prefetch'

const app = createApp()
const router = createRouter()
app.use(router)
app.use(Vue3RouterPrefetch)
```

Then you can use `<router-link>` without any changes, when this component is visible in viewport, it will automatically prefetch the (async) route component.

You can also register it as a new component instead of overriding `<router-link>`:

```js
app.use(Vue3RouterPrefetch, {
  name: 'QuickLink',
})
```

Now you can use it as `<quick-link>` in your app.

## Browser Support

- [Support situation](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

## Props

All [props](https://router.vuejs.org/api/#router-link-props) of `<router-link>` are still available, additional props are listed below.

### type

- Type: `'view' | 'hover' | 'none'`
- Default: `view`

How to pull resources in advance.
It can also be defined globally:

```js
app.use(RouterPrefetch, {
  type: 'hover',
})
```

### timeout

- Type: `number`
- Default: `2000` (ms)

Timeout after which prefetching will occur.
