import { Stack, Container, Box, Heading, Text, Input, Button } from "@chakra-ui/react"
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
      <Box 
        w="100%" 
        bgGradient="linear(to-r,gray.400,yellow.400,pink.400, red.400, blue.400, green.400)" 
        p={2}
      />
      <Box as="main">
        {children}
      </Box>
      <Box as="footer" bg="gray.900" p={5} color="white">
        <Container maxW="container.lg">
          <Stack isInline alignItems="center" mx="auto" w="full" maxW="container.md">
            <Text>Receba atualizações sobre vagas semanalmente:</Text>
            <Input 
              size="sm"
              maxW={300}
              placeholder="Seu e-mail"
            />
            <Button size="sm" rounded="none" color="black">
              Inscrever
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Layout