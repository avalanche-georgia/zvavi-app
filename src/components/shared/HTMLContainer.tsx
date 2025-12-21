import React from 'react'

// Polymorphic HTML container that renders a string as HTML using dangerouslySetInnerHTML
// Use with trusted/sanitized HTML only. At this state with local translations only!

type HTMLContainerProps<T extends React.ElementType = 'div'> = {
  content?: string
  component?: T
} & Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'dangerouslySetInnerHTML'>

const HTMLContainer = React.forwardRef(
  <T extends React.ElementType = 'div'>(props: HTMLContainerProps<T>, ref: React.Ref<Element>) => {
    const { component, content, ...restProps } = props

    if (!content) return null

    const Component = (component || 'div') as React.ElementType

    return (
      <Component
        ref={ref}
        dangerouslySetInnerHTML={{ __html: content }}
        {...restProps} // eslint-disable-line react/jsx-props-no-spreading
      />
    )
  },
)

HTMLContainer.displayName = 'HTMLContainer'

export default HTMLContainer
