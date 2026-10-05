import remarkBreaks from 'remark-breaks'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

import type { TextFormat } from './config'
import { textFormat as defaultTextFormat } from './config'

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

const toText = (text: string, format: TextFormat) => (format === 'html' ? escapeHtml(text) : text)

const inlineToText = (node: MarkdownNode, format: TextFormat): string => {
  const childrenText = () =>
    (node.children ?? []).map((child) => inlineToText(child, format)).join('')

  switch (node.type) {
    case 'break':
      return format === 'html' ? '<br/>' : '\n'
    case 'strong':
      return format === 'html' ? `<b>${childrenText()}</b>` : childrenText()
    case 'image':
      return toText(node.alt ?? '', format)
    // Raw HTML is shown as text, never passed through
    case 'html':
    case 'inlineCode':
    case 'text':
      return toText(node.value ?? '', format)
    // Emphasis, links and anything else: keep the text, drop the markup
    default:
      return childrenText()
  }
}

// Paragraphs and headings stay paragraphs; lists, quotes and other blocks are
// flattened to their text, one paragraph per leaf block. Never drops content.
const blockToParagraphs = (node: MarkdownNode, format: TextFormat): string[] => {
  if (node.type === 'paragraph' || node.type === 'heading') {
    return [(node.children ?? []).map((child) => inlineToText(child, format)).join('')]
  }

  if (node.children) return node.children.flatMap((child) => blockToParagraphs(child, format))

  // Link reference definitions (`[label]: url`) keep their URL
  if (node.type === 'definition') return [toText(node.url ?? '', format)]

  if (node.value) return [toText(node.value, format)]

  return []
}

// Converts our restricted Markdown (what the site renders) to a CAAML comment:
// html → only <b> and <br/>, which the schema allows; plain → no markup.
// Returns '' when there is no content.
const markdownToCaamlText = (markdown: string, format: TextFormat = defaultTextFormat) => {
  // parse() alone doesn't run plugins: remark-breaks is a transformer, so runSync is required
  const tree = markdownParser.runSync(
    markdownParser.parse(markdown.replace(/\r\n?/g, '\n')),
  ) as MarkdownNode

  return (tree.children ?? [])
    .flatMap((child) => blockToParagraphs(child, format))
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .join(format === 'html' ? '<br/><br/>' : '\n\n')
}

export default markdownToCaamlText
