import { Routes, Route } from 'react-router'
import Layout from './layouts/Layouts'
import HomePage from './pages/HomePage'
import SecondPage from './pages/Inspo'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/second" element={<SecondPage />} />
      </Route>
    </Routes>
  )
}