export const navigationItems = [
  {
    path: '/',
    label: 'Inspo page',
    page: 'Inspo',
    showInNav: true,
  },
  {
    path: '/news',
    label: 'News page',
    page: 'News',
    showInNav: true,
  },
  {
    path: '/home2',
    label: 'Home2 page',
    page: 'Home2',
    showInNav: true,
  },
  {
    path: '/about',
    label: 'About page',
    page: 'About',
    showInNav: true,
  },
  {
    path: '/inspo2',
    label: 'Inspo2 page',
    page: 'Inspo2',
    showInNav: true,
  },
]

export function getVisibleNavigationItems(items = navigationItems) {
  return items.filter((item) => item.showInNav)
}
