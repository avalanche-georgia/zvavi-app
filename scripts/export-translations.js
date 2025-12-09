import fs from 'node:fs'
import path from 'node:path'

const en = JSON.parse(fs.readFileSync(path.join('messages/en.json'), 'utf8'))
const ka = JSON.parse(fs.readFileSync(path.join('messages/ka.json'), 'utf8'))

const flatten = (obj, prefix = '') => {
  const res = {}
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(res, flatten(value, fullKey))
    } else {
      res[fullKey] = value
    }
  }
  return res
}

const flatEn = flatten(en)
const flatKa = flatten(ka)

const keys = Object.keys(flatEn).sort()

let out = 'ID,EN,KA\n'
for (const key of keys) {
  const enVal = (flatEn[key] ?? '').toString().replace(/"/g, '""')
  const kaVal = (flatKa[key] ?? '').toString().replace(/"/g, '""')
  out += `"${key}","${enVal}","${kaVal}"\n`
}

fs.writeFileSync('./messages/translations.csv', out, 'utf8')
console.log('✅ Exported to translations.csv')
