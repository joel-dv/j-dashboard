import { lazy } from 'react'
import { navigationItems } from './navigation'

const pageModules = import.meta.glob('../pages/*.jsx')

function getPageComponent(pageName) {
  const pageModulePath = `../pages/${pageName}.jsx`
  const pageLoader = pageModules[pageModulePath]

  if (!pageLoader) {
    throw new Error(
      `Missing page component for "${pageName}". Expected file: src/pages/${pageName}.jsx`
    )
  }

  return lazy(pageLoader)
}

export const appRoutes = navigationItems.map((route) => ({
  path: route.path,
  label: route.label,
  element: getPageComponent(route.page),
  showInNav: route.showInNav,
}))
