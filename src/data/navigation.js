export const navigationItems = [
  {
    path: '/',
    label: 'Home page',
    page: 'Home',
    showInNav: true,
  },
  {
    path: '/news',
    label: 'News page',
    page: 'News',
    showInNav: true,
  },
  {
    path: '/arts',
    label: 'Arts page',
    page: 'Arts',
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
  {
    path: '/dev-tools',
    label: 'DevTools page',
    page: 'DevTools',
    showInNav: true,
  },
  {
    path: '/airbnb',
    label: 'Airbnb page',
    page: 'Airbnb',
    showInNav: true,
  },
  {
    path: '/ibm',
    label: 'Ibm page',
    page: 'Ibm',
    showInNav: true,
  },
]

export function getVisibleNavigationItems(items = navigationItems) {
  return items.filter((item) => item.showInNav)
}
