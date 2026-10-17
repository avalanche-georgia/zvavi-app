import { apiVersion, customDataNamespace, providerWebsite } from './config'
import type { CaamlBulletin, CaamlBulletinCollection } from './types'

const buildCollection = (bulletins: CaamlBulletin[]): CaamlBulletinCollection => ({
  bulletins,
  customData: { [customDataNamespace]: { apiVersion } },
  metaData: {
    extFiles: [
      {
        description: 'Avalanche Georgia website',
        fileReferenceURI: providerWebsite,
        fileType: 'link',
      },
    ],
  },
})

export default buildCollection
