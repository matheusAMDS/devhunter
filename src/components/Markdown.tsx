import ReactMarkdown from "react-markdown"
import ChakraUIRenderer, { defaults } from "chakra-ui-markdown-renderer"
import { Heading } from "@chakra-ui/layout"

interface Props {
  src: string
}

const Markdown: React.FC<Props> = ({ src }) => {
  return (
    <ReactMarkdown
      renderers={ChakraUIRenderer({
        ...defaults,
        heading: props => {
          const { children, level } = props
          
          return <Heading size="lg" my={4}>{children}</Heading>
        }
      })}
      source={src}
      escapeHtml={false}
    />
  )
}

export default Markdown