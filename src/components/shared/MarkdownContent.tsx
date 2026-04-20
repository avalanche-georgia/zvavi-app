import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

const MarkdownContent = ({ content }: { content: string }) => (
  <ReactMarkdown remarkPlugins={[remarkBreaks]}>{content}</ReactMarkdown>
)

export default MarkdownContent
