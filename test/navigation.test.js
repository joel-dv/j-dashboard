import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getVisibleNavigationItems,
  navigationItems,
} from '../src/data/navigation.js'

test('navigation items expose unique paths and labels', () => {
  const paths = navigationItems.map((item) => item.path)
  const labels = navigationItems.map((item) => item.label)

  assert.equal(new Set(paths).size, paths.length)
  assert.equal(new Set(labels).size, labels.length)
})

test('navigation items include the page key used to build routes', () => {
  for (const item of navigationItems) {
    assert.equal(typeof item.path, 'string')
    assert.equal(typeof item.label, 'string')
    assert.equal(typeof item.page, 'string')
    assert.equal(typeof item.showInNav, 'boolean')
  }
})

test('getVisibleNavigationItems only returns entries enabled for nav', () => {
  const items = [
    { path: '/', label: 'Visible', page: 'Visible', showInNav: true },
    { path: '/hidden', label: 'Hidden', page: 'Hidden', showInNav: false },
  ]

  assert.deepEqual(getVisibleNavigationItems(items), [items[0]])
})
