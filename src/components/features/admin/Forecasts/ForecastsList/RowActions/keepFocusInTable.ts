// When a row leaves the list (deleted, filtered out) its focused control goes with it.
// Move focus to the table region instead of letting it fall back to the page start.
const settleDelayMs = 300

const keepFocusInTable = (control: HTMLElement | null) => {
  const table = control?.closest<HTMLElement>('[data-table-root]')

  if (!table) return

  setTimeout(() => {
    const { activeElement } = document

    if (activeElement && activeElement !== document.body) return
    table.focus()
  }, settleDelayMs)
}

export default keepFocusInTable
