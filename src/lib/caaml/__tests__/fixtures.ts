import edge from '../__fixtures__/edge.json'
import goldenEdge from '../__fixtures__/golden/edge.json'
import goldenNullable from '../__fixtures__/golden/nullable.json'
import goldenTypical from '../__fixtures__/golden/typical.json'
import nullable from '../__fixtures__/nullable.json'
import typical from '../__fixtures__/typical.json'
import type { BulletinForecast, BulletinRegion } from '../input'
import { parseBulletinSource } from '../input'

export type Fixture = { forecast: BulletinForecast; now: Date; region: BulletinRegion }

const toFixture = ({
  forecast,
  now,
  region,
}: {
  forecast: unknown
  now: string
  region: unknown
}) => ({
  ...parseBulletinSource({ forecast, region }),
  now: new Date(now),
})

export const fixtures = {
  edge: { golden: goldenEdge, input: edge },
  nullable: { golden: goldenNullable, input: nullable },
  typical: { golden: goldenTypical, input: typical },
}

export const loadFixture = (name: keyof typeof fixtures): Fixture => toFixture(fixtures[name].input)

// Deep copy of a fixture's raw (unparsed) input, for mutation in fail-closed tests
export const rawFixture = (name: keyof typeof fixtures) =>
  structuredClone(fixtures[name].input) as unknown as {
    forecast: Record<string, unknown> & {
      avalancheProblems: Record<string, unknown>[]
      hazardLevels: Record<string, unknown>
    }
    now: string
    region: Record<string, unknown>
  }
