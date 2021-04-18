import ReactMarkdown from "react-markdown"
import ChakraUIRenderer, { defaults } from "chakra-ui-markdown-renderer"
import { Heading, Link } from "@chakra-ui/layout"
import gfm from "remark-gfm"

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
        },
        link: props => {
          console.log(props)
          const { children, href } = props 

          return (
            <Link href={href} target="_blank" color="blue.400">
              {children}
            </Link>
          )
        }
      })}
      source={src}
      escapeHtml={false}
      plugins={[gfm]}
    />
  )
}

export default Markdown