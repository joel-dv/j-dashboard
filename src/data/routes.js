import { lazy } from 'react'
import { navigationItems } from './navigation'

const pageComponents = {
  News: lazy(() => import('../pages/News')),
  Home2: lazy(() => import('../pages/Home2')),
  Home: lazy(() => import('../pages/Home')),
  About: lazy(() => import('../pages/About')),
  Inspo2: lazy(() => import('../pages/Inspo2')),
}

export const appRoutes = navigationItems.map((route) => ({
  path: route.path,
  label: route.label,
  element: pageComponents[route.page],
  showInNav: route.showInNav,
}))
