import { aspects, avalancheTypes, distributionTypes, sensitivityLevels } from '@domain/constants'
import { describe, expect, it } from 'vitest'

import {
  aspectToCaaml,
  avalancheTypeToProblemType,
  distributionToFrequency,
  hazardLevelToDangerRating,
  sensitivityToSnowpackStability,
} from '../mappings'

describe('exhaustive mappings', () => {
  it.each([
    ['cornice', 'cornices'],
    ['deepSlab', 'persistent_weak_layers'],
    ['glide', 'gliding_snow'],
    ['looseDry', 'new_snow'],
    ['looseWet', 'wet_snow'],
    ['persistentSlab', 'persistent_weak_layers'],
    ['stormSlab', 'new_snow'],
    ['wetSlab', 'wet_snow'],
    ['windSlab', 'wind_slab'],
  ] as const)('problem type %s → %s', (type, expected) => {
    expect(avalancheTypeToProblemType[type]).toBe(expected)
  })

  it('covers every problem type, and only those', () => {
    expect(Object.keys(avalancheTypeToProblemType).sort()).toEqual(
      Object.keys(avalancheTypes).sort(),
    )
  })

  it.each([
    ['unreactive', 'good'],
    ['stubborn', 'fair'],
    ['reactive', 'poor'],
    ['touchy', 'very_poor'],
  ] as const)('sensitivity %s → %s', (sensitivity, expected) => {
    expect(sensitivityToSnowpackStability[sensitivity]).toBe(expected)
  })

  it('covers every sensitivity', () => {
    expect(Object.keys(sensitivityToSnowpackStability).sort()).toEqual(
      Object.keys(sensitivityLevels).sort(),
    )
  })

  it.each([
    ['isolated', 'few'],
    ['specific', 'some'],
    ['widespread', 'many'],
  ] as const)('distribution %s → %s', (distribution, expected) => {
    expect(distributionToFrequency[distribution]).toBe(expected)
  })

  it('covers every distribution', () => {
    expect(Object.keys(distributionToFrequency).sort()).toEqual(
      Object.keys(distributionTypes).sort(),
    )
  })

  it.each([
    ['0', 'no_rating'],
    ['1', 'low'],
    ['2', 'moderate'],
    ['3', 'considerable'],
    ['4', 'high'],
    ['5', 'very_high'],
  ] as const)('hazard level %s → %s', (level, expected) => {
    expect(hazardLevelToDangerRating[level]).toBe(expected)
  })

  it('maps every aspect to its upper-case CAAML code', () => {
    Object.entries(aspects).forEach(([aspect, label]) => {
      expect(aspectToCaaml[aspect as keyof typeof aspects]).toBe(label)
    })
  })
})
