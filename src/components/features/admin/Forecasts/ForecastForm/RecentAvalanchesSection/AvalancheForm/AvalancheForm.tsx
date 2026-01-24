import { useCallback, useState } from 'react'
import { Textarea } from '@components/ui'
import type { Avalanche, AvalancheSize as AvalancheSizeType } from '@domain/types'
import { useTranslations } from 'next-intl'

import DateSection from './DateSection'
import { Aspects, AvalancheSize, Footer, type SetAspectsData } from '../../common'

export type AvalancheFormProps = {
  avalancheData: Avalanche
  onClose: VoidFunction
  onSave: (data: Avalanche) => void
}

const AvalancheForm = ({ avalancheData, onClose, onSave }: AvalancheFormProps) => {
  const t = useTranslations()

  const [data, setData] = useState(avalancheData)

  const handleSizeChange = useCallback(
    (value: AvalancheSizeType) => {
      setData((prev) => ({
        ...prev,
        size: value,
      }))
    },
    [setData],
  )

  const handleDescriptionChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData((prev) => ({
        ...prev,
        description: target.value,
      }))
    },
    [setData],
  )

  const handleSave = () => {
    onSave(data)
    onClose()
  }

  return (
    <div className="flex flex-col gap-6 rounded border p-3">
      <section className="grid grid-cols-2 items-start gap-x-6">
        <div className="flex flex-col gap-3">
          <DateSection data={data} setData={setData} />

          <AvalancheSize onChange={handleSizeChange} value={data.size} />
        </div>

        <Aspects data={data} setData={setData as SetAspectsData} />
      </section>

      <div className="flex flex-col gap-4 pt-1.5">
        <h4 className="w-32 font-semibold">{t('admin.forecast.form.common.labels.description')}</h4>
        <Textarea
          className="w-full"
          onChange={handleDescriptionChange}
          rows={4}
          value={data.description}
        />
      </div>

      <Footer onCancel={onClose} onSave={handleSave} />
    </div>
  )
}

export default AvalancheForm
