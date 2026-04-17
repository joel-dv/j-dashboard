import { spawnSync } from 'node:child_process'

console.log('Running commit verification...')

const checks = [
  ['build', ['run', 'build']],
  ['unit tests', ['run', 'test:run']],
]

for (const [label, command] of checks) {
  console.log(`\nRunning ${label}...`)

  const result = spawnSync('npm', command, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  if (result.status !== 0) {
    console.error(`\nCommit gate failed during ${label}.`)
    console.error('Suggested next steps:')
    console.error('- Fix the failing build or test before committing.')
    console.error('- Run `npm run build` and `npm run test:run` locally while iterating.')
    console.error('- Retry the commit after both checks pass.')

    process.exit(result.status ?? 1)
  }
}

console.log('\nCommit gate passed. Build and tests are green.')
