import News from '../pages/News'
import Home2 from '../pages/Home2'
import Inspo from '../pages/Inspo'
import About from '../pages/About'
import Inspo2 from '../pages/Inspo2'
import { navigationItems } from './navigation'

const pageComponents = {
  News,
  Home2,
  Inspo,
  About,
  Inspo2,
}

export const appRoutes = navigationItems.map((route) => ({
  path: route.path,
  label: route.label,
  element: pageComponents[route.page],
  showInNav: route.showInNav,
}))
