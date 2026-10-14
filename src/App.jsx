import { Suspense } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import { appRoutes } from './data/routes'

export default function App() {
  return (
    <Suspense fallback={<div className="page">Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          {appRoutes.map((route) => {
            const Page = route.element

            return <Route key={route.path} path={route.path} element={<Page />} />
          })}
          <Route path="*" element={
            <main className="page">
              <header className="page-intro">
                <h1>Page not found</h1>
                <p>This address doesn't match a page in this project.</p>
              </header>
              <Link className="dashboard-button" to="/">Back to dashboard</Link>
            </main>
          } />
        </Route>
      </Routes>
    </Suspense>
  )
}
