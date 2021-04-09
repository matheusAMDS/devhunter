import { Stack, Container, Box, Heading, Text, Input, Button, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import NextLink from "next/link"

interface Props {
  jumbotron?: ReactNode
}

const Layout: React.FC<Props> = ({ children, jumbotron }) => {
  return (
    <Box bg="whiteAlpha.100">
      <Box p={5} bg="white" as="header">
        <Container maxW="container.xl">
          <Stack justifyContent="space-between" flexDirection="row">
            <NextLink href="/">
              <Heading>DevHunter</Heading>
            </NextLink>
            <Text>Sobre</Text>
          </Stack>
        </Container>
      </Box>
      <Box p={6} bg="gray.900" color="white">
        {jumbotron}
      </Box>
      <Box as="main">
        {children}
      </Box>
      <Box as="footer" bg="gray.600" p={5} color="white">
        <Container maxW="container.lg">
          <Flex 
            justifyContent="space-between" 
            alignItems="center" 
            flexWrap="wrap"
            mx="auto" w="full" 
            maxW="container.md"
          >
            <Text>Receba atualizações sobre vagas semanalmente:</Text>
            <Stack isInline as="fieldset" w="full" maxW="sm">
              <Input 
                size="sm"
                maxW={300}
                placeholder="Seu e-mail"
              />
              <Button size="sm" rounded="none" color="black">
                Inscrever
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout