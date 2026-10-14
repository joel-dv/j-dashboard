import test from 'node:test'
import assert from 'node:assert/strict'
import { buildPreCommitHookSource } from '../scripts/install-git-hooks.js'

test('pre-commit hook runs the commit verification script', () => {
  const source = buildPreCommitHookSource()

  assert.match(source, /^#!\/bin\/sh/m)
  assert.match(source, /node scripts\/verify-commit\.js/)
})
