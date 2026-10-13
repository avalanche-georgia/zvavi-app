import { sectionLabelClasses } from '../sections/SectionCard'

import { cn } from '@/lib/utils'

type InfoSectionProps = {
  children: React.ReactNode
  title: string
}

// Labelled block inside an info sheet
const InfoSection = ({ children, title }: InfoSectionProps) => (
  <section className="px-4 pt-5">
    <h3 className={cn(sectionLabelClasses, 'mb-2.5')}>{title}</h3>
    {children}
  </section>
)

export default InfoSection
