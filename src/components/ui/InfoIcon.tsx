import { Icon } from '@components/icons'
import type { ReactNode } from 'react'

import { Tooltip } from './Tooltip'

const InfoIcon = ({ content }: { content: ReactNode }) => (
  <Tooltip content={content}>
    <span className="cursor-default text-gray-400 hover:text-gray-600">
      <Icon icon="info" size="sm" />
    </span>
  </Tooltip>
)

export default InfoIcon
