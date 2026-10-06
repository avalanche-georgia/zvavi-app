import { describe, expect, it } from 'vitest'

import { fixtures, loadFixture } from './fixtures'
import officialExample from '../__fixtures__/officialExample.json'
import buildBulletin from '../buildBulletin'
import buildCollection from '../buildCollection'
import validateCollection from '../validate'

const fixtureNames = Object.keys(fixtures) as (keyof typeof fixtures)[]

describe('oracle equivalence', () => {
  it.each(fixtureNames)('%s matches the golden file and validates', (name) => {
    const collection = buildCollection([buildBulletin(loadFixture(name))])

    expect(collection).toEqual(fixtures[name].golden)
    expect(validateCollection(collection)).toEqual({ errors: [], isValid: true })
  })

  // The schema requires almost nothing, so presence is asserted here
  it.each(fixtureNames)('%s always carries id, validity, region and three ratings', (name) => {
    const bulletin = buildBulletin(loadFixture(name))

    expect(bulletin.bulletinID).toMatch(/^[0-9a-f-]{36}$/)
    expect(bulletin.validTime.startTime).toMatch(/Z$/)
    expect(bulletin.validTime.endTime).toMatch(/Z$/)
    expect(bulletin.regions).toHaveLength(1)
    expect(bulletin.dangerRatings).toHaveLength(3)
  })
})

describe('schema validator', () => {
  it('accepts the official example', () => {
    expect(validateCollection(officialExample).isValid).toBe(true)
  })

  it('accepts an empty collection', () => {
    expect(validateCollection(buildCollection([])).isValid).toBe(true)
  })

  it.each([
    ['an unknown top-level key', { bulletins: [], foo: 1 }],
    ['an extra bulletin key', { bulletins: [{ foo: 1 }] }],
    ['mainValue "extreme"', { bulletins: [{ dangerRatings: [{ mainValue: 'extreme' }] }] }],
    [
      'source with provider and person',
      { bulletins: [{ source: { person: { name: 'b' }, provider: { name: 'a' } } }] },
    ],
  ])('rejects %s', (_label, document) => {
    expect(validateCollection(document).isValid).toBe(false)
  })
})
