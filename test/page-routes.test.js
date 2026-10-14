import test from 'node:test'
import assert from 'node:assert/strict'
import { getPageRoutes } from '../src/data/pageRoutes.js'

test('pages absent from navigation still receive routes', () => {
  const navigation = [{ path: '/', label: 'Home', page: 'Home', showInNav: true }]
  const routes = getPageRoutes(['Home', 'Inspo', 'Home2', 'Arts'], navigation)

  assert.deepEqual(routes.map((route) => route.path), ['/', '/inspo', '/home2', '/arts'])
  assert.ok(routes.slice(1).every((route) => route.showInNav === false))
})

test('configured URLs and hidden navigation entries are preserved without duplicate page routes', () => {
  const navigation = [{ path: '/study', label: 'Study', page: 'Inspo', showInNav: false }]
  const routes = getPageRoutes(['Home', 'Inspo'], navigation)

  assert.deepEqual(routes, [
    ...navigation,
    { path: '/', label: 'Home', page: 'Home', showInNav: false },
  ])
})
