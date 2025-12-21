/* eslint-disable prefer-destructuring */
import { generateSocialImage, socialImageConfig } from './lib/generateSocialImage'

export const runtime = 'edge'

export const alt = socialImageConfig.alt
export const size = socialImageConfig.size
export const contentType = socialImageConfig.contentType

const OGImage = async () => generateSocialImage()

export default OGImage
