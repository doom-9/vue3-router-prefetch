import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AppComponent from './App.vue'
import vue3RouterPrefetch from './lib'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./testPage/one.vue'),
    },
    {
      path: '/two',
      component: () => import('./testPage/two.vue'),
    },
    {
      path: '/three',
      component: () => import('./testPage/three.vue'),
    },
  ],
})

const app = createApp(AppComponent)

app.use(router)

app.use(vue3RouterPrefetch)

app.mount('#app')
