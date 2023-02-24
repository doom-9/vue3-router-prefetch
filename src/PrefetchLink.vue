<script setup lang="ts">
import type { RouteComponent } from 'vue-router'
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
import type { Lazy, RouterLinkOptions } from './type'
import { isRouteComponent, linkProvideKey } from './type'
import { beginObserve, stopObserve } from './observer'

interface RouterLinkProps extends RouterLinkOptions {
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
  type?: 'view' | 'hover'
}

const props = defineProps<RouterLinkProps>()

const link = reactive(useLink(props))

const linkInjectValue = inject(linkProvideKey)

const linkElementRef = ref<null | HTMLAnchorElement>(null)

const mergedType = ref<'view' | 'hover'>('hover')

watchEffect(() => {
  if (props.type)
    mergedType.value = props.type
  else mergedType.value = linkInjectValue?.type || 'hover'
})

const handleMouseEnter = () => {
  const { matched } = link.route

  for (const record of matched) {
    if (!record.components && !record.children.length)
      return

    for (const name in record.components) {
      const rawComponent = record.components[name]

      if (!isRouteComponent(rawComponent))
        (rawComponent as Lazy<RouteComponent>)()
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
      else {
        linkElementRef.value.addEventListener('mouseenter', handleMouseEnter)
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
  <RouterLink
    v-slot="{ isActive, href, navigate, route }"
    v-bind="props"
    custom
  >
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
