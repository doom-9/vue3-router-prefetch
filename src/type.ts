import type { InjectionKey } from 'vue'
import type { RouteComponent, RouteLocationRaw } from 'vue-router'
import type { pluginOptions } from './lib'

export interface RouterLinkOptions {
  /**
   * Route Location the link should navigate to when clicked on.
   */
  to: RouteLocationRaw
  /**
   * Calls `router.replace` instead of `router.push`.
   */
  replace?: boolean
}

export type Lazy<T> = () => Promise<T>

export type RawRouteComponent = RouteComponent | Lazy<RouteComponent>

export function isRouteComponent(
  component: RawRouteComponent,
): component is RouteComponent {
  return (
    typeof component === 'object'
    || 'displayName' in component
    || 'props' in component
    || '__vccOpts' in component
  )
}

export const linkProvideKey: InjectionKey<pluginOptions> = Symbol(
  'vue3-router-prefetch',
)
