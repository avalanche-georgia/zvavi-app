import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

const MarkdownContent = ({ content }: { content: string }) => (
  <ReactMarkdown allowedElements={['br', 'em', 'p', 'strong']} remarkPlugins={[remarkBreaks]}>
    {content}
  </ReactMarkdown>
)

export default MarkdownContent
