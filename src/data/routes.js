import News from '../pages/News'
import Home2 from '../pages/Home2'
import Inspo from '../pages/Inspo'
import About from '../pages/About'
import Inspo2 from '../pages/Inspo2'

export const appRoutes = [
  {
    path: '/',
    label: 'Inspo page',
    element: Inspo,
    showInNav: true,
  },
  {
    path: '/news',
    label: 'News page',
    element: News,
    showInNav: true,
  },
  {
    path: '/home2',
    label: 'Home2 page',
    element: Home2,
    showInNav: true,
  },
  {
    path: '/about',
    label: 'About page',
    element: About,
    showInNav: true,
  },
  {
    path: '/inspo2',
    label: 'Inspo2 page',
    element: Inspo2,
    showInNav: true,
  },
]