import { readdirSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import appSections from './appSections'

const appDir = path.resolve(__dirname, '../../app/[locale]')

// Route folders, looking through route groups like (public); [region] is the dynamic one
const listSections = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap(({ name }) => {
      if (name.startsWith('(')) return listSections(path.join(directory, name))
      if (name.startsWith('[')) return []

      return [name]
    })

describe('appSections', () => {
  it('lists every top-level section of the app, so none is answered with a 404', () => {
    expect([...appSections].sort()).toEqual(listSections(appDir).sort())
  })
})
