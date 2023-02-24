<script setup lang="ts">
import type { RouteComponent, RouteLocation } from 'vue-router'
import { RouterLink } from 'vue-router'
import { defineProps, inject, ref, watchEffect } from 'vue'
import type { Lazy, RouterLinkOptions } from './type'
import { isRouteComponent, linkProvideKey } from './type'

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
}
interface PrefetchLinkProps {
  type?: 'view' | 'hover'
}

const props = defineProps<RouterLinkProps & PrefetchLinkProps>()

const linkInjectValue = inject(linkProvideKey)

const mergedType = ref<'view' | 'hover'>('hover')

watchEffect(() => {
  if (props.type)
    mergedType.value = props.type
  else mergedType.value = linkInjectValue?.type || 'hover'
})

const handleMouseEnter = (
  route: RouteLocation & {
    href: string
  },
) => {
  const { matched } = route

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
      :href="href"
      :class="isActive ? activeClass : exactActiveClass"
      @mouseenter="handleMouseEnter(route)"
      @click="navigate"
    >
      <slot />
    </a>
  </RouterLink>
</template>
