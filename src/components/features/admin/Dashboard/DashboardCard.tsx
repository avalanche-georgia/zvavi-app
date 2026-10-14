import { useId } from 'react'

type DashboardCardProps = {
  children: React.ReactNode
  title: string
}

// A titled panel of the overview
const DashboardCard = ({ children, title }: DashboardCardProps) => {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className="rounded-card border-rule bg-surface flex flex-col gap-3 border p-4"
    >
      <h2 className="text-copy text-ink font-semibold" id={titleId}>
        {title}
      </h2>
      {children}
    </section>
  )
}

export default DashboardCard
