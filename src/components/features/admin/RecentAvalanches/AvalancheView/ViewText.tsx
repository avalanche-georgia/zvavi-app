import { DetailSection } from '@components/features/observations'

type ViewTextProps = {
  text: string | null
  title: string
}

const ViewText = ({ text, title }: ViewTextProps) => {
  if (!text) return null

  return (
    <DetailSection title={title}>
      <p className="text-ink text-copy-lg leading-prose m-0 whitespace-pre-wrap">{text}</p>
    </DetailSection>
  )
}

export default ViewText
