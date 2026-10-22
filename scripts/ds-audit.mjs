// Static audit of the design-system kit (src/components/ds). See DESIGN_SYSTEM.md.
// Usage: node scripts/ds-audit.mjs  — prints violations as `file:line`, exits 1 when there are any.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dsDir = path.join(root, 'src/components/ds')
const galleryEntriesFile = path.join(
  root,
  'src/components/features/admin/DesignSystemGallery/entries.ts',
)
const globalsCssFile = path.join(root, 'src/app/globals.css')
const designTokensFile = path.join(root, 'src/lib/designTokens.ts')

// Accepted findings: `check` + path prefix (relative to ds/) + optional `match` on the message, with the reason
const exceptions = [
  {
    check: 'dark-theme',
    file: '',
    reason: 'Report-only until a dark theme is planned: they need on-* / *-soft tokens first',
  },
  {
    check: 'inline-style',
    file: 'primitives/AvalancheLoader/Slide.tsx',
    reason: 'Per-clump CSS custom properties (--dx, --rot, …) drive the keyframes; not styling',
  },
  {
    check: 'structure',
    file: 'primitives/toggle',
    reason: 'Shared toggle-group internals (ToggleOption, useSingleToggle), not a component',
  },
]

// --- helpers ---------------------------------------------------------------

const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name)

    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })

const relative = (file) => path.relative(dsDir, file)
const isTest = (file) => /\.test\.tsx?$/.test(file)
const isGallery = (file) => file.endsWith('.gallery.tsx')

const violations = []

const report = (check, file, line, message) => {
  const exception = exceptions.find(
    (candidate) =>
      candidate.check === check &&
      relative(file).startsWith(candidate.file) &&
      (!candidate.match || candidate.match.test(message)),
  )

  violations.push({ check, exception, file: relative(file), line, message })
}

const forEachLine = (file, lines, check, pattern, message) => {
  lines.forEach((text, index) => {
    const match = text.match(pattern)

    if (match) report(check, file, index + 1, typeof message === 'function' ? message(match) : message)
  })
}

// Lines that are neither blank nor comments (same idea as ESLint max-lines skip options)
const countLogicalLines = (source) => {
  const withoutBlockComments = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '')

  return withoutBlockComments
    .split('\n')
    .filter((text) => text.trim() !== '' && !text.trim().startsWith('//')).length
}

// --- token vocabulary from @theme -------------------------------------------

const globalsCss = fs.readFileSync(globalsCssFile, 'utf8')
const themeNames = (prefix) =>
  [...globalsCss.matchAll(new RegExp(`--${prefix}-([a-z0-9-]+?)(?:--[a-z-]+)?:`, 'g'))]
    .map((match) => match[1])
    .filter((name, index, names) => names.indexOf(name) === index)

const theme = {
  colour: themeNames('color'),
  ease: themeNames('ease'),
  radius: themeNames('radius'),
  shadow: themeNames('shadow'),
  text: themeNames('text'),
  tracking: themeNames('tracking'),
}

// Built-in Tailwind words that follow these prefixes and are not tokens
const builtIns = {
  bg: /^(white|black|transparent|current|inherit|none|clip-.+|origin-.+|cover|contain|center|fixed|local|scroll|no-repeat|repeat.*|linear-.+|radial.*|conic.*|bottom|top|left|right|auto|size-.+|position-.+)$/,
  border: /^(white|black|\d+|x|y|t|b|l|r|s|e|x-\d+|y-\d+|t-\d+|b-\d+|l-\d+|r-\d+|s-\d+|e-\d+|solid|dashed|dotted|double|hidden|none|collapse|separate|spacing.*|transparent|current|inherit)$/,
  ease: /^(linear|in|out|in-out|initial)$/,
  outline: /^(\d+|none|hidden|solid|dashed|dotted|double|offset-.+|transparent|current|inherit)$/,
  // Tailwind's default radius / shadow / font-size scales are not ds tokens, so only these pass
  rounded: /^(none|full)$/,
  shadow: /^(none|transparent|current)$/,
  text: /^(white|black|left|center|right|start|end|justify|wrap|nowrap|balance|pretty|ellipsis|clip|transparent|current|inherit|shadow.*)$/,
  tracking: /^(tighter|tight|normal|wide|wider|widest)$/,
}

// prefix → which theme list holds its token names
const tokenPrefixes = {
  bg: ['colour'],
  border: ['colour'],
  caret: ['colour'],
  decoration: ['colour'],
  divide: ['colour'],
  ease: ['ease'],
  fill: ['colour'],
  outline: ['colour'],
  placeholder: ['colour'],
  ring: ['colour'],
  rounded: ['radius'],
  shadow: ['shadow', 'colour'],
  stroke: ['colour'],
  text: ['text', 'colour'],
  tracking: ['tracking'],
}

const usedTokens = new Set()

const checkTokens = (file, lines) => {
  const classPattern =
    /(?<![\w-])(?:[a-z0-9-]+:)*(bg|border(?:-[xytblrse])?|caret|decoration|divide|ease|fill|outline|placeholder|ring|rounded(?:-[tblrse]{1,2})?|shadow|stroke|text|tracking)-([a-z][a-z0-9-]*)(?:\/\d+)?(?![\w[-])/g

  lines.forEach((text, index) => {
    if (/^\s*(import|\/\/|\*)/.test(text)) return

    for (const match of text.matchAll(classPattern)) {
      const prefix = match[1].replace(/-[xytblrse]{1,2}$/, '')
      const name = match[2]

      if (builtIns[prefix]?.test(name)) continue
      const lists = tokenPrefixes[prefix] ?? []
      const owner = lists.find((list) => theme[list].includes(name))

      if (owner) {
        usedTokens.add(`${owner}:${name}`)
        continue
      }

      // Non-class identifiers that happen to look like classes (e.g. `text-ellipsis` handled above)
      if (/^(\d|x|y)/.test(name)) continue
      report('unknown-token', file, index + 1, `\`${match[0]}\` is not a @theme token`)
    }
  })
}

// --- per-file checks --------------------------------------------------------

const rawPalette =
  /\b(bg|text|border|ring|outline|fill|stroke|from|via|to|divide|placeholder|decoration|shadow|caret)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d/
// A hex colour sits right after a quote, bracket, colon or `=` (`#180` in copy text is not one)
const colourLiteral = /[\[\'"`:=]\s?#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?|oklch)\(/
// Viewport / safe-area layout maths (`h-[94dvh]`, `pb-[calc(…env(safe-area-inset-bottom))]`) has no
// token equivalent and is allowed; fixed sizes (`h-[42px]`, `text-[13px]`) are not
const arbitraryValue =
  /\b(text|rounded|shadow|w|h|size|min-h|min-w|max-w|max-h|p[xytblrse]?|m[xytblrse]?|gap|leading|tracking)-\[(?![^\]]*(?:vw|vh|dvh|svh|env\())[^\]]+\]/
const tokenBypass = /(?<![\w-])(?:[a-z-]+:)*(text-white|bg-white|bg-black|text-black|border-white|border-black)(\/\d+)?\b/
const opacityOnToken = /(?<![\w-])(?:[a-z-]+:)*(bg|text|border|ring|fill|stroke)-(primary|accent|danger|success|warning|ink|surface)[a-z-]*\/\d+/
const abbreviatedName =
  /(?:\(|,\s*|\b(?:const|let)\s+)(e|p|el|ev|evt|btn|cb|val|idx|elem|obj|arr|str|num|tmp|ctx|res|req|err|opts|cfg)\s*(?:[,)=:]|\)\s*=>)/
const inlineBlockHandler = /\s(on[A-Z]\w*|render\w*)=\{\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{/
const screamingCase = /\b(?:const|let)\s+([A-Z][A-Z0-9_]+)\s*=/
const snakeCase = /\b(?:const|let)\s+([a-z]+_[a-z0-9_]+)\b/

const checkFile = (file) => {
  const source = fs.readFileSync(file, 'utf8')
  const lines = source.split('\n')
  const isSourceFile = /\.(tsx?|css)$/.test(file)

  if (!isSourceFile) return

  // Tests may assert a class (Calendar's selected day); they don't style anything
  if (isTest(file)) return

  forEachLine(file, lines, 'raw-palette', rawPalette, 'raw Tailwind palette class')
  // Gallery fixture text is full of record numbers ("#180 · 12 Jan"); ESLint still bans `[#hex]` there
  if (!isGallery(file)) {
    forEachLine(file, lines, 'colour-literal', colourLiteral, 'hex / rgb() / hsl() colour literal')
  }
  forEachLine(file, lines, 'arbitrary-value', arbitraryValue, (match) => `arbitrary value \`${match[0]}\``)
  forEachLine(file, lines, 'dark-theme', tokenBypass, (match) => `\`${match[1]}\` bypasses tokens`)
  forEachLine(file, lines, 'dark-theme', opacityOnToken, (match) => `opacity on a token \`${match[0].trim()}\``)
  forEachLine(file, lines, 'inline-style', /\bstyle=\{\{/, 'inline style')

  if (file.endsWith('.css')) return

  const isBinding = relative(file).startsWith('form/')

  if (!isBinding && !isGallery(file)) {
    forEachLine(file, lines, 'import', /from '(@components\/ui|@components\/features)[^']*'/, 'imports legacy ui / features')
    forEachLine(file, lines, 'import', /useTranslations|from 'next-intl'/, 'translations inside ds (pass strings as props)')
  }

  forEachLine(file, lines, 'import', /from 'clsx'/, 'clsx — use cn()')
  forEachLine(file, lines, 'import', /import type .* from 'react'|import \{[^}]*\btype\b[^}]*\} from 'react'/, "type import from 'react' — use the global React.*")
  forEachLine(file, lines, 'naming', screamingCase, (match) => `SCREAMING_CASE \`${match[1]}\``)
  forEachLine(file, lines, 'naming', snakeCase, (match) => `snake_case \`${match[1]}\``)
  forEachLine(file, lines, 'naming', abbreviatedName, (match) => `abbreviated name \`${match[1]}\``)
  forEachLine(file, lines, 'inline-handler', inlineBlockHandler, (match) => `multi-statement inline \`${match[1]}\` handler`)

  if (!isTest(file) && countLogicalLines(source) > 100) {
    report('file-length', file, 1, `${countLogicalLines(source)} logical lines (> 100)`)
  }

  if (!isTest(file) && !isGallery(file)) {
    // A `.Trigger render={…}` takes its focus style from the element it renders (the caller's
    // Button / IconButton); popups are containers, not controls
    const hasInteractive = /<button\b|<input\b|<textarea\b|<a\b|\.Trigger\b(?![^>]*render=)|\.Item\b|\.Thumb\b|\.Input\b/.test(source)
    const hasFocusStyle = /focus-ring|focus-visible:|data-highlighted:|focusRing|controlClasses|chipClasses|getButtonClasses|selectClasses|calendarClasses|fieldControl|<Button\b|<IconButton\b/.test(source)

    if (hasInteractive && !hasFocusStyle) report('focus', file, 1, 'interactive element without focus-ring / focus-visible style')
    checkTokens(file, lines)
  }
}

// --- folder checks ----------------------------------------------------------

const componentFolders = ['primitives', 'patterns'].flatMap((tier) =>
  fs
    .readdirSync(path.join(dsDir, tier), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dsDir, tier, entry.name)),
)

const galleryEntries = fs.readFileSync(galleryEntriesFile, 'utf8')

// Folders whose demo intentionally lives in another folder's gallery
const sharedGalleries = {
  'primitives/NumberField': 'primitives/Field',
  'primitives/SearchField': 'primitives/Field',
  'primitives/TextField': 'primitives/Field',
  'primitives/Textarea': 'primitives/Field',
}

const checkFolder = (folder) => {
  const name = path.basename(folder)
  const files = fs.readdirSync(folder)
  const galleryHost = sharedGalleries[relative(folder)] ?? relative(folder)
  const isComponent = /^[A-Z]/.test(name)

  if (!isComponent) {
    report('structure', folder, 1, 'not a component folder (lower-case name: shared internals)')

    return
  }

  if (!files.includes('index.ts')) report('structure', folder, 1, 'no index.ts')
  if (!files.includes(`${name}.tsx`)) report('structure', folder, 1, `no ${name}.tsx`)

  const galleryFile = `${path.basename(galleryHost)}.gallery.tsx`
  const hasGallery = fs.existsSync(path.join(dsDir, galleryHost, galleryFile))

  if (!hasGallery) report('gallery', folder, 1, `no ${galleryFile}`)
  else if (!galleryEntries.includes(`@ds/${galleryHost}/${path.basename(galleryHost)}.gallery'`)) {
    report('gallery', folder, 1, `${galleryFile} not registered in entries.ts`)
  }

  if (!files.some((file) => isTest(file))) report('test', folder, 1, 'no *.test.tsx')
}

// --- token sync ---------------------------------------------------------------

const checkTokenSync = () => {
  const designTokens = fs.readFileSync(designTokensFile, 'utf8')
  const listed = (exportName) => {
    const match = designTokens.match(new RegExp(`${exportName} = \\[([^\\]]*)\\]`))

    return match ? [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1]) : []
  }

  const pairs = [
    ['fontSizeTokens', 'text'],
    ['radiusTokens', 'radius'],
    ['shadowTokens', 'shadow'],
    ['trackingTokens', 'tracking'],
  ]

  pairs.forEach(([exportName, kind]) => {
    const inFile = listed(exportName)

    theme[kind]
      .filter((name) => !inFile.includes(name))
      .forEach((name) => report('token-sync', designTokensFile, 1, `@theme ${kind} \`${name}\` missing from ${exportName}`))
    inFile
      .filter((name) => !theme[kind].includes(name))
      .forEach((name) => report('token-sync', designTokensFile, 1, `${exportName} lists \`${name}\`, not in @theme`))
  })
}

// --- run ----------------------------------------------------------------------

walk(dsDir).forEach(checkFile)
componentFolders.forEach(checkFolder)
checkTokenSync()

const open = violations.filter((violation) => !violation.exception)
const accepted = violations.filter((violation) => violation.exception)

const print = (rows) =>
  rows
    .toSorted((first, second) => first.check.localeCompare(second.check) || first.file.localeCompare(second.file))
    .forEach(({ check, file, line, message }) => console.log(`${check.padEnd(16)} ${`${file}:${line}`.padEnd(64)} ${message}`))

console.log(`ds audit — ${open.length} violation(s), ${accepted.length} documented exception(s)\n`)
print(open)

if (accepted.length) {
  console.log('\nDocumented exceptions:')
  print(accepted)
  ;[...new Set(accepted.map(({ exception }) => exception.reason))].forEach((reason) => console.log(`  - ${reason}`))
}

const unused = Object.entries({ radius: theme.radius, shadow: theme.shadow, text: theme.text })
  .flatMap(([kind, names]) => names.filter((name) => !usedTokens.has(`${kind}:${name}`)).map((name) => `${kind}:${name}`))

console.log(`\nTokens defined in @theme but unused in ds/ (info): ${unused.join(', ') || 'none'}`)
const unusedColours = theme.colour.filter((name) => !usedTokens.has(`colour:${name}`))

console.log(`Colours defined but unused in ds/ (info): ${unusedColours.join(', ') || 'none'}`)

process.exit(open.length ? 1 : 0)
