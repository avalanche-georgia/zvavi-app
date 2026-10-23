import type { AbstractIntlMessages } from 'next-intl'
import { describe, expect, it } from 'vitest'

import pickPublicMessages from './pickPublicMessages'
import en from '../../messages/en.json'

describe('pickPublicMessages', () => {
  const picked = pickPublicMessages(en as unknown as AbstractIntlMessages) as unknown as typeof en

  it('keeps the public scopes as they are', () => {
    expect(picked.common).toEqual(en.common)
    expect(picked.forecast).toEqual(en.forecast)
  })

  it('keeps only the admin and legal parts public pages read', () => {
    expect(Object.keys(picked.admin)).toEqual(['forecast', 'forecasts'])
    expect(picked.admin.forecast).toEqual(en.admin.forecast)
    expect(Object.keys(picked.admin.forecasts)).toEqual(['view'])
    expect(picked.legal).toEqual({ consent: en.legal.consent })
  })

  it('leaves out server-only metadata', () => {
    expect(picked).not.toHaveProperty('seo')
  })
})
