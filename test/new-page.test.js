import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildPageTemplate,
  createNewPage,
  updateNavigationSource,
  updateRoutesSource,
} from '../scripts/new-page.js'

test('createNewPage writes the page file and updates navigation and routes', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'new-page-test-'))

  try {
    fs.mkdirSync(path.join(tempRoot, 'src/pages'), { recursive: true })
    fs.mkdirSync(path.join(tempRoot, 'src/data'), { recursive: true })

    fs.writeFileSync(
      path.join(tempRoot, 'src/data/routes.js'),
      `import { lazy } from 'react'
import { navigationItems } from './navigation'

const pageComponents = {
  Home: lazy(() => import('../pages/Home')),
}

export const appRoutes = navigationItems.map((route) => ({
  path: route.path,
  label: route.label,
  element: pageComponents[route.page],
  showInNav: route.showInNav,
}))
`
    )

    fs.writeFileSync(
      path.join(tempRoot, 'src/data/navigation.js'),
      `export const navigationItems = [
  {
    path: '/',
    label: 'Home page',
    page: 'Home',
    showInNav: true,
  },
]
`
    )

    const result = createNewPage(tempRoot, 'CaseStudy')

    assert.equal(result.routePath, '/case-study')
    assert.equal(
      fs.readFileSync(path.join(tempRoot, 'src/pages/CaseStudy.jsx'), 'utf8'),
      buildPageTemplate('CaseStudy')
    )

    const routesSource = fs.readFileSync(path.join(tempRoot, 'src/data/routes.js'), 'utf8')
    const navigationSource = fs.readFileSync(
      path.join(tempRoot, 'src/data/navigation.js'),
      'utf8'
    )

    assert.match(routesSource, /CaseStudy: lazy\(\(\) => import\('\.\.\/pages\/CaseStudy'\)\),/)
    assert.match(navigationSource, /path: '\/case-study'/)
    assert.match(navigationSource, /page: 'CaseStudy'/)
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true })
  }
})

test('updateRoutesSource rejects duplicate page registrations', () => {
  assert.throws(
    () =>
      updateRoutesSource(
        `const pageComponents = {
  CaseStudy: lazy(() => import('../pages/CaseStudy')),
}`,
        'CaseStudy'
      ),
    /already registered/
  )
})

test('updateNavigationSource rejects duplicate navigation entries', () => {
  assert.throws(
    () =>
      updateNavigationSource(
        `export const navigationItems = [
  {
    path: '/case-study',
    label: 'CaseStudy page',
    page: 'CaseStudy',
    showInNav: true,
  },
]`,
        'CaseStudy'
      ),
    /already registered/
  )
})
