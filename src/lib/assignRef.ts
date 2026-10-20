// Points a ref the caller passed (callback or object) at a node, so a component
// can keep its own ref to an element and still forward the caller's
export const assignRef = <TElement>(
  ref: React.Ref<TElement> | undefined,
  node: TElement | null,
) => {
  if (typeof ref === 'function') ref(node)
  else if (ref) ref.current = node
}
