import { Outlet } from 'react-router'
import Header from '../component/Header'

export default function Layout() {
  return (
    <div className="site-shell layout">
      <Header />
      <Outlet />
    </div>
  )
}