export const navigationItems = [
  {
    path: '/',
    label: 'Home',
    page: 'Home',
    showInNav: true,
  },
  {
    path: '/news',
    label: 'News',
    page: 'News',
    showInNav: true,
  },
  {
    path: '/tools',
    label: 'Tools',
    page: 'Tools',
    showInNav: true,
  },
  {
    path: '/portfolios',
    label: 'Portfolios',
    page: 'Portfolios',
    showInNav: true,
  },
    {
    path: '/about',
    label: 'About',
    page: 'About',
    showInNav: true,
  },
]

export function getVisibleNavigationItems(items = navigationItems) {
  return items.filter((item) => item.showInNav)
}
