import { DetailSection } from '@components/features/observations'

type ViewTextProps = {
  text: string | null
  title: string
}

const ViewText = ({ text, title }: ViewTextProps) => {
  if (!text) return null

  return (
    <DetailSection title={title}>
      <p className="text-ink m-0 text-[15px] leading-[1.55] whitespace-pre-wrap">{text}</p>
    </DetailSection>
  )
}

export default ViewText
