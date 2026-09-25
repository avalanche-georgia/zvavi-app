import { S3Client } from '@aws-sdk/client-s3'

// Server-only — the R2 secret key must never reach the client. Browsers get
// short-lived presigned URLs instead (see /api/observations/upload-url).
export const createR2Client = () =>
  new S3Client({
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    region: 'auto',
    // The SDK otherwise adds a CRC32 checksum param to presigned PUT URLs,
    // which a browser upload can't satisfy (it doesn't send the header).
    requestChecksumCalculation: 'WHEN_REQUIRED',
  })

export const observationsBucket = process.env.R2_BUCKET_OBSERVATIONS!
