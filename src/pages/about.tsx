import { Container, Heading, Link, UnorderedList, ListItem, Text } from "@chakra-ui/layout"
import Layout from "components/Layout"
import Head from "next/head"

const About: React.FC = () => {
  const repos = [
    {
      name: "backend-br/vagas",
      url: "https://github.com/backend-br/vagas/issues"
    },
    {
      name: "frontendbr/vagas",
      url: "https://github.com/frontendbr/vagas/issues"
    }
  ]
  return (
    <Layout
      jumbotron={
        <Container maxW="container.lg" textAlign="center" p={8}>
          <Heading size="3xl">Sobre o DevHunter</Heading>
        </Container>
      }
    >
      <Head>
        <title>Sobre | DevHunter</title>
      </Head> 
      <Container maxW="container.lg" mx="auto" p={8} minH="60vh">
        <Text fontSize={20}>
          DevHunter é um projeto criado por {""}
          <Link href="https://github.com/matheusAMDS" target="_blank">
            Matheus Andrade
          </Link> focado em 
          agregar vagas para developers. Atualmente essas vagas são coletadas através
          das issues dos seguintes repositórios públicos do Github:
        </Text>
        <UnorderedList ml={24} my={4}>
          {repos.map((repo, i) => (
            <ListItem key={i}>
              <Text as="span">{repo.name}</Text>:{' '}
              <Link href={repo.url} target="_blank">{repo.url}</Link>
            </ListItem>
          ))}
        </UnorderedList>
        <Text fontSize={20}>
          Você também pode vizualizar o código fonte desse projeto {""}
          <Link href="https://github.com/matheusAMDS/devhunter" target="_blank">
            aqui
          </Link>
        </Text>
      </Container>
    </Layout>
  )
}

export default About