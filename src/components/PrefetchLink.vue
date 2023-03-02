<script setup lang="ts">
import type { RouteComponent, RouteLocationRaw } from 'vue-router'
import { RouterLink, useLink } from 'vue-router'
import {
  defineProps,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watchEffect,
} from 'vue'
import type { Lazy } from '../type'
import { isRouteComponent, linkProvideKey } from '../type'
import { beginObserve, stopObserve } from '../observer'

interface RouterLinkProps {
  /**
   * Whether RouterLink should not wrap its content in an `a` tag. Useful when
   * using `v-slot` to create a custom RouterLink
   */
  custom?: boolean
  /**
   * Class to apply when the link is active
   */
  activeClass?: string
  /**
   * Class to apply when the link is exact active
   */
  exactActiveClass?: string
  /**
   * Value passed to the attribute `aria-current` when the link is exact active.
   *
   * @defaultValue `'page'`
   */
  ariaCurrentValue?:
  | 'page'
  | 'step'
  | 'location'
  | 'date'
  | 'time'
  | 'true'
  | 'false'
  /**
   * Route Location the link should navigate to when clicked on.
   */
  to: RouteLocationRaw
  /**
   * Calls `router.replace` instead of `router.push`.
   */
  replace?: boolean
  type?: 'view' | 'hover' | 'none'
  timeout?: number
  forcedPull?: boolean
}

const props = defineProps<RouterLinkProps>()

const link = reactive(useLink(props))

const linkInjectValue = inject(linkProvideKey)

const linkElementRef = ref<null | HTMLAnchorElement>(null)

const mergedType = ref<'view' | 'hover' | 'none'>('view')

const mergedTimeout = ref(0)

const mergedForcedPull = ref(false)

watchEffect(() => {
  if (props.type)
    mergedType.value = props.type
  else mergedType.value = linkInjectValue?.type || 'view'

  if (typeof props.timeout === 'number')
    mergedTimeout.value = props.timeout
  else if (typeof linkInjectValue?.timeout === 'number')
    mergedTimeout.value = linkInjectValue?.timeout

  if (typeof props.forcedPull === 'boolean')
    mergedForcedPull.value = props.forcedPull
  else if (typeof linkInjectValue?.forcedPull === 'boolean')
    mergedForcedPull.value = linkInjectValue?.forcedPull
})

const handleMouseEnter = () => {
  const { to } = props
  if (!to)
    return

  const { matched } = link.route

  for (const record of matched) {
    if (!record.components && !record.children.length)
      return

    for (const name in record.components) {
      const rawComponent = record.components[name]

      if (!isRouteComponent(rawComponent)) {
        if (mergedForcedPull.value) {
          setTimeout(() => {
            (rawComponent as Lazy<RouteComponent>)()
          }, mergedTimeout.value)
        }
        else {
          window.requestIdleCallback(() => {
            setTimeout(() => {
              (rawComponent as Lazy<RouteComponent>)()
            }, mergedTimeout.value)
          })
        }
      }
    }
  }
}

onMounted(() => {
  watchEffect(() => {
    if (linkElementRef.value) {
      if (mergedType.value === 'view') {
        linkElementRef.value.removeEventListener(
          'mouseenter',
          handleMouseEnter,
        )
        beginObserve(linkElementRef.value, handleMouseEnter)
      }
      else if (mergedType.value === 'hover') {
        linkElementRef.value.addEventListener('mouseenter', handleMouseEnter)
        stopObserve(linkElementRef.value)
      }
      else if (mergedType.value === 'none') {
        linkElementRef.value.removeEventListener(
          'mouseenter',
          handleMouseEnter,
        )
        stopObserve(linkElementRef.value)
      }
    }
  })
})

onUnmounted(() => {
  if (linkElementRef.value)
    stopObserve(linkElementRef.value)
})
</script>

<script lang="ts">
export default {
  name: 'PrefetchLink',
  inheritAttrs: false,
}
</script>

<template>
  <RouterLink v-slot="{ isActive, href, navigate }" v-bind="props" custom>
    <a
      v-bind="$attrs"
      ref="linkElementRef"
      :href="href"
      :class="isActive ? activeClass : exactActiveClass"
      @click="navigate"
    >
      <slot />
    </a>
  </RouterLink>
</template>
