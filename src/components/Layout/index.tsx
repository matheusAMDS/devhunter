import { Stack, Container, Box, Heading, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
  jumbotron?: ReactNode
}

const Layout: React.FC<Props> = ({ children, jumbotron }) => {
  return (
    <>
      <Box p={5} bg="gray.200">
        <Container maxW="container.xl">
          <Stack justifyContent="space-between" flexDirection="row">
            <Heading>DevHunter</Heading>
            <Text>Sobre</Text>
          </Stack>
          {jumbotron}
        </Container>
      </Box>
      <Box as="main">
        {children}
      </Box>
    </>
  )
}

export default Layout