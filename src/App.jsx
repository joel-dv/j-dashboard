import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import { appRoutes } from './data/routes'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {appRoutes.map((route) => {
          const Page = route.element

          return <Route key={route.path} path={route.path} element={<Page />} />
        })}
      </Route>
    </Routes>
  )
}
