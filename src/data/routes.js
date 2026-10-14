import { lazy } from 'react'
import { navigationItems } from './navigation'
import { getPageRoutes } from './pageRoutes'

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

const pageNames = Object.keys(pageModules).map((path) =>
  path.split('/').pop().replace(/\.jsx$/, '')
)

export const appRoutes = getPageRoutes(pageNames, navigationItems).map((route) => ({
  path: route.path,
  label: route.label,
  element: getPageComponent(route.page),
  showInNav: route.showInNav,
}))
