// Esc closes only the topmost layer: a popup open inside a dialog must not let
// the same keypress reach the dialog and close it too
export const stopEscapePropagation = (event: KeyboardEvent) => event.stopPropagation()
