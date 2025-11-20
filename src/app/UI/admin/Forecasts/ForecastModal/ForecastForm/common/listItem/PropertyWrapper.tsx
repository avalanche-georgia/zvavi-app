import clsx from 'clsx'

type PropertyWrapperProps = {
  children: React.ReactNode
  title: string
  titleClassname?: string
}

const PropertyWrapper = ({ children, title, titleClassname }: PropertyWrapperProps) => (
  <div className="flex items-center gap-2">
    <h4 className={clsx('flex-none font-semibold', titleClassname)}>{title}:</h4>
    {children}
  </div>
)

export default PropertyWrapper
