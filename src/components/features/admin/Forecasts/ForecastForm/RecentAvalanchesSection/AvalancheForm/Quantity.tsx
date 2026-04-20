import { useCallback } from 'react'
import { NumberInput } from '@components/ui'
import type { Avalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import { InputBlock } from '../../common'

type QuantityProps = {
  setData: React.Dispatch<React.SetStateAction<Avalanche>>
  quantity: number
}

const Quantity = ({ quantity, setData }: QuantityProps) => {
  const t = useTranslations()

  const handleQuantityChange = useCallback(
    (value: number | null) => {
      setData((prev) => ({ ...prev, quantity: value }))
    },
    [setData],
  )

  return (
    <InputBlock
      label={t('admin.forecast.form.recentAvalanches.labels.quantity')}
      labelClassName="w-32"
    >
      <NumberInput className="w-42" min={1} onValueChange={handleQuantityChange} value={quantity} />
    </InputBlock>
  )
}

export default Quantity
