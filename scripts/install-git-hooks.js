import fs from 'node:fs'
import path from 'node:path'

export function buildPreCommitHookSource() {
  return `#!/bin/sh
node scripts/verify-commit.js
`
}

export function installGitHooks(projectRoot = process.cwd()) {
  const gitDir = path.join(projectRoot, '.git')

  if (!fs.existsSync(gitDir)) {
    console.log('Skipping git hook install because .git was not found.')
    return
  }

  const hooksDir = path.join(gitDir, 'hooks')
  const hookPath = path.join(hooksDir, 'pre-commit')

  try {
    fs.mkdirSync(hooksDir, { recursive: true })
    fs.writeFileSync(hookPath, buildPreCommitHookSource())
    fs.chmodSync(hookPath, 0o755)
    console.log('Installed git pre-commit hook at .git/hooks/pre-commit')
  } catch (error) {
    if (error && typeof error === 'object' && error.code === 'EPERM') {
      console.log(
        'Skipping git hook install because this environment cannot write to .git/hooks right now.'
      )
      return
    }

    throw error
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  installGitHooks()
}
