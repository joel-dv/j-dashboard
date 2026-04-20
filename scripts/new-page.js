import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const CLI_USAGE = 'Usage: npm run new-page -- PageName'
const PAGE_NAME_ERROR =
  'Page name must be PascalCase and start with a capital letter, for example: Home3'

export function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

export function getRoutePath(pageName) {
  return pageName === 'HomePage' ? '/' : `/${toKebabCase(pageName)}`
}

export function buildPageTemplate(pageName) {
  return `export default function ${pageName}() {
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
}

export function updateRoutesSource(routesSource, pageName) {
  const pageRegistration = `  ${pageName}: lazy(() => import('../pages/${pageName}')),`

  if (routesSource.includes(pageRegistration)) {
    throw new Error(`${pageName} is already registered in src/data/routes.js`)
  }

  const pageComponentsPattern = /(const pageComponents = \{\n)([\s\S]*?)(\n\})/

  if (!pageComponentsPattern.test(routesSource)) {
    throw new Error('Could not determine where to insert the page registration')
  }

  return routesSource.replace(
    pageComponentsPattern,
    (_, objectStart, objectBody, objectEnd) =>
      `${objectStart}${objectBody}${objectBody.endsWith('\n') ? '' : '\n'}${pageRegistration}${objectEnd}`
  )
}

export function updateNavigationSource(navigationSource, pageName) {
  const routePath = getRoutePath(pageName)
  const routeLabel = `${pageName} page`
  const navigationEntry = `  {
    path: '${routePath}',
    label: '${routeLabel}',
    page: '${pageName}',
    showInNav: true,
  },`

  if (navigationSource.includes(`page: '${pageName}'`)) {
    throw new Error(`${pageName} is already registered in src/data/navigation.js`)
  }

  const navigationItemsPattern = /(export const navigationItems = \[\n)([\s\S]*?)(\n\])/

  if (!navigationItemsPattern.test(navigationSource)) {
    throw new Error('Could not determine where to insert the navigation entry')
  }

  return navigationSource.replace(
    navigationItemsPattern,
    (_, arrayStart, arrayBody, arrayEnd) =>
      `${arrayStart}${arrayBody}${arrayBody.endsWith('\n') ? '' : '\n'}${navigationEntry}${arrayEnd}`
  )
}

export function createNewPage(projectRoot, pageName) {
  if (!pageName) {
    throw new Error(CLI_USAGE)
  }

  if (!/^[A-Z][A-Za-z0-9]*$/.test(pageName)) {
    throw new Error(PAGE_NAME_ERROR)
  }

  const pageFilePath = path.join(projectRoot, 'src/pages', `${pageName}.jsx`)
  const routesFilePath = path.join(projectRoot, 'src/data/routes.js')
  const navigationFilePath = path.join(projectRoot, 'src/data/navigation.js')

  if (fs.existsSync(pageFilePath)) {
    throw new Error(`Page already exists: src/pages/${pageName}.jsx`)
  }

  if (!fs.existsSync(routesFilePath)) {
    throw new Error('Could not find src/data/routes.js')
  }

  if (!fs.existsSync(navigationFilePath)) {
    throw new Error('Could not find src/data/navigation.js')
  }

  const routesSource = fs.readFileSync(routesFilePath, 'utf8')
  const navigationSource = fs.readFileSync(navigationFilePath, 'utf8')

  const updatedRoutes = updateRoutesSource(routesSource, pageName)
  const updatedNavigation = updateNavigationSource(navigationSource, pageName)

  fs.writeFileSync(pageFilePath, buildPageTemplate(pageName))
  fs.writeFileSync(routesFilePath, updatedRoutes)
  fs.writeFileSync(navigationFilePath, updatedNavigation)

  return {
    pageFilePath,
    routePath: getRoutePath(pageName),
    routesFilePath,
    navigationFilePath,
  }
}

const scriptPath = fileURLToPath(import.meta.url)
const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : null

if (invokedPath === scriptPath) {
  try {
    const pageName = process.argv[2]
    const result = createNewPage(process.cwd(), pageName)

    console.log(`Created ${path.relative(process.cwd(), result.pageFilePath)}`)
    console.log(`Registered route ${result.routePath} in src/data/navigation.js`)
    console.log('Registered page component in src/data/routes.js')
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
