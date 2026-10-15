type ContentPageProps = {
  children: React.ReactNode
  // One or two sentences under the title
  lede?: React.ReactNode
  title: string
}

// A reading page (about, join, contact…): title and lede, then a column of cards
const ContentPage = ({ children, lede, title }: ContentPageProps) => (
  <div className="bg-canvas text-ink">
    <div className="mx-auto max-w-3xl px-4 pt-6 pb-12 md:px-5 lg:pt-9 lg:pb-16">
      <header className="mb-5 lg:mb-7">
        <h1 className="text-title lg:text-title-lg font-bold">{title}</h1>
        {lede && <p className="text-body text-copy-lg mt-2 max-w-2xl text-pretty">{lede}</p>}
      </header>
      <div className="flex flex-col gap-3 lg:gap-4">{children}</div>
    </div>
  </div>
)

export default ContentPage
