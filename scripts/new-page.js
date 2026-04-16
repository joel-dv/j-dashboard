import fs from 'node:fs'
import path from 'node:path'

const pageName = process.argv[2]

if (!pageName) {
  console.error('Usage: npm run new-page -- PageName')
  process.exit(1)
}

if (!/^[A-Z][A-Za-z0-9]*$/.test(pageName)) {
  console.error(
    'Page name must be PascalCase and start with a capital letter, for example: Home3'
  )
  process.exit(1)
}

const projectRoot = process.cwd()
const pageFilePath = path.join(projectRoot, 'src/pages', `${pageName}.jsx`)
const routesFilePath = path.join(projectRoot, 'src/data/routes.js')

const routePath = pageName === 'HomePage' ? '/' : `/${toKebabCase(pageName)}`
const routeLabel = `${pageName} page`

if (fs.existsSync(pageFilePath)) {
  console.error(`Page already exists: src/pages/${pageName}.jsx`)
  process.exit(1)
}

if (!fs.existsSync(routesFilePath)) {
  console.error('Could not find src/data/routes.js')
  process.exit(1)
}

const pageTemplate = `export default function ${pageName}() {
  return (
    <main className="page">
      <header className="page-intro">
        <h1>${pageName}</h1>
        <p>A new page generated for your dashboard.</p>
      </header>

      <section className="panel">
        <h2>${pageName} ready</h2>
        <p>
          Use this page as a starting point for new content, layouts, or
          experiments in your project.
        </p>
      </section>
    </main>
  )
}
`
const routesSource = fs.readFileSync(routesFilePath, 'utf8')
const importLine = `import ${pageName} from '../pages/${pageName}'`

if (routesSource.includes(importLine)) {
  console.error(`${pageName} is already registered in src/data/routes.js`)
  process.exit(1)
}

const lastImportMatch = routesSource.match(
  /import\s+\w+\s+from\s+'..\/pages\/[^']+'\n(?!import)/g
)

if (!lastImportMatch) {
  console.error('Could not determine where to insert the page import')
  process.exit(1)
}

const lastImport = lastImportMatch[lastImportMatch.length - 1]
const withImport = routesSource.replace(lastImport, `${lastImport}${importLine}\n`)

const newRouteEntry = `  {
    path: '${routePath}',
    label: '${routeLabel}',
    element: ${pageName},
    showInNav: true,
  },
]`

if (!withImport.includes(']')) {
  console.error('Could not determine where to insert the route entry')
  process.exit(1)
}

const updatedRoutes = withImport.replace(/\]\s*$/, newRouteEntry)

fs.writeFileSync(pageFilePath, pageTemplate)
fs.writeFileSync(routesFilePath, updatedRoutes)

console.log(`Created src/pages/${pageName}.jsx`)
console.log(`Registered route ${routePath} in src/data/routes.js`)

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}
