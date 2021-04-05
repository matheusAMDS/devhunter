import Head from 'next/head'
import { Box, Container, Divider, Heading, Stack, Tag, Text } from "@chakra-ui/react"
import { formatDistanceToNow } from "date-fns"
import brLocale from "date-fns/locale/pt-BR"
import { MdLocationCity } from "react-icons/md"
import NextLink from "next/link"

import Layout from "components/Layout"
import { fetchJobs, ProcessedJob } from "lib/jobs/fetchFromGithub"
import { GetServerSideProps } from 'next'

interface Props {
  jobs: ProcessedJob[]
}

const Home: React.FC<Props> = ({ jobs }) => {
  const postedDate = (date: string) => {
    const distance = formatDistanceToNow(new Date(date), { 
      locale: brLocale,
      addSuffix: false
    })

    return "Há " + distance + " atrás"
  }

  return (
    <Layout
      jumbotron={
        <Container maxW="container.md" textAlign="center" my={5}>
          <Heading size="3xl">Bem vindo ao DevHunter</Heading>
          <Text fontSize="x-large" mt={5}>
            Descubra diversas vagas de emprego exclusivas para desenvolvedores.
          </Text>
        </Container>
      }
    >
      <Head>
        <title>Home | DevHunter</title>
      </Head>
      <Container maxW="container.lg" py={5}>
        { jobs.map(job => (
          <NextLink 
            href="/jobs/[id]" 
            as={`/jobs/${job.github_id}`} 
            key={job.github_id}
          >
            <Box p={2} cursor="pointer" my={2}>
              <Text color="gray.500">
                {postedDate(String(job.updated_at))}
              </Text>
              <Heading mb={1}>{job.title}</Heading>
              <Text as="p" fontSize={18} mb={1}>
                Postada por <strong>{job.company}</strong>
              </Text>
              <Stack isInline alignItems="center">
                <MdLocationCity />
                <Text>{job.location}</Text>
              </Stack>
              <Box mt={3}>
                {job.labels.map(label => (
                  <Tag 
                    mr={1} 
                    mb={1} 
                    key={label} 
                    variant="solid" 
                    colorScheme="green"
                  >
                    {label}
                  </Tag>
                ))}
              </Box>
              <Divider mt={5} />
            </Box>
          </NextLink>
        ))}
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const jobs = await fetchJobs({ 
    since: new Date("2021/04/02"),
  })

  return {
    props: {
      jobs
    }
  }
}

export default Home
