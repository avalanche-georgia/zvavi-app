import remarkBreaks from 'remark-breaks'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

// Minimal structural view of mdast nodes (avoids depending on @types/mdast)
type MarkdownNode = {
  alt?: string | null
  children?: MarkdownNode[]
  type: string
  url?: string
  value?: string
}

// Same parser stack as the site's MarkdownContent, so line breaks match
const markdownParser = unified().use(remarkParse).use(remarkBreaks)

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const inlineToText = (node: MarkdownNode): string => {
  const childrenText = () => (node.children ?? []).map(inlineToText).join('')

  switch (node.type) {
    case 'break':
      return '<br/>'
    case 'strong':
      return `<b>${childrenText()}</b>`
    case 'image':
      return escapeHtml(node.alt ?? '')
    // Raw HTML is shown as text, never passed through
    case 'html':
    case 'inlineCode':
    case 'text':
      return escapeHtml(node.value ?? '')
    // Emphasis, links and anything else: keep the text, drop the markup
    default:
      return childrenText()
  }
}

// Paragraphs and headings stay paragraphs; lists, quotes and other blocks are
// flattened to their text, one paragraph per leaf block. Never drops content.
const blockToParagraphs = (node: MarkdownNode): string[] => {
  if (node.type === 'paragraph' || node.type === 'heading') {
    return [(node.children ?? []).map(inlineToText).join('')]
  }

  if (node.children) return node.children.flatMap(blockToParagraphs)

  // Link reference definitions (`[label]: url`) keep their URL
  if (node.type === 'definition') return [escapeHtml(node.url ?? '')]

  if (node.value) return [escapeHtml(node.value)]

  return []
}

// Converts our restricted Markdown (what the site renders) to a CAAML comment:
// only <b> and <br/>, which the schema allows; everything else is escaped text.
// Returns '' when there is no content.
const markdownToCaamlText = (markdown: string) => {
  // parse() alone doesn't run plugins: remark-breaks is a transformer, so runSync is required
  const tree = markdownParser.runSync(
    markdownParser.parse(markdown.replace(/\r\n?/g, '\n')),
  ) as MarkdownNode

  return (tree.children ?? [])
    .flatMap(blockToParagraphs)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .join('<br/><br/>')
}

export default markdownToCaamlText
