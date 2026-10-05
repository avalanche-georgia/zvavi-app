import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import schema from './schema/CAAMLv6_BulletinEAWS.json'

// Compiled once per server instance. Default strict mode.
const ajv = new Ajv({ allErrors: true })

addFormats(ajv)

const validator = ajv.compile(schema)

export type ValidationResult = { errors: string[]; isValid: boolean }

// Validates a document against the official CAAML v6 EAWS bulletin schema.
// Errors carry schema paths and keywords only, never document values.
const validateCollection = (document: unknown): ValidationResult => {
  const isValid = validator(document)

  return {
    errors: (validator.errors ?? []).map(
      (error) => `${error.instancePath || '/'} ${error.keyword}: ${error.schemaPath}`,
    ),
    isValid,
  }
}

export default validateCollection
