// Navigation can override a page's URL without controlling its availability.
export function getPageRoutes(pageNames, navigationItems) {
  const configuredPages = new Set(navigationItems.map((item) => item.page))
  const unlistedPages = pageNames
    .filter((page) => !configuredPages.has(page))
    .map((page) => ({
      path: page === 'Home' ? '/' : `/${page.toLowerCase()}`,
      label: page,
      page,
      showInNav: false,
    }))

  return [...navigationItems, ...unlistedPages]
}
