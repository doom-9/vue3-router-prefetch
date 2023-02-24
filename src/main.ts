import type { App } from 'vue'
import PrefetchLink from './PrefetchLink.vue'
import { linkProvideKey } from './type'

export interface pluginOptions {
  type: 'view' | 'hover'
}

export default {
  install: (app: App, options: pluginOptions) => {
    const RouterLink
      = app.component('RouterLink') || app.component('router-link')

    if (!RouterLink) {
      console.error(
        '[vue3-router-prefetch] You need to call app.use(VueRouter) before this plugin!',
      )
    }
    app.provide(linkProvideKey, options)
    app.component('RouterLink', PrefetchLink)
  },
}
