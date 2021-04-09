import Head from 'next/head'
import { Box, Container, Divider, Heading, Stack, Tag, Text } from "@chakra-ui/react"
import { formatDistanceToNow } from "date-fns"
import brLocale from "date-fns/locale/pt-BR"
import { MdLocationCity } from "react-icons/md"
import NextLink from "next/link"

import Layout from "components/Layout"
import { GetServerSideProps } from 'next'
import indexJobs from 'lib/jobs/services/indexJobs'
import { Job } from "lib/jobs/model"

interface Props {
  jobs: Job[],
  hasNextPage: boolean,
  nextPage: number
}

const Home: React.FC<Props> = ({ jobs, hasNextPage, nextPage }) => {
  const postedDate = (date: number) => {
    const distance = formatDistanceToNow(new Date(date), { 
      locale: brLocale,
      addSuffix: false
    })

    return "Há " + distance + " atrás"
  }

  return (
    <Layout
      jumbotron={
        <Container maxW="container.lg" textAlign="center" my={5}>
          <Heading fontSize={["5xl", "6xl"]}>Bem vindo ao DevHunter</Heading>
          <Text fontSize={["x-large", "xx-large"]} mt={5} color="gray.200">
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
            as={`/jobs/${job._id}`} 
            key={String(job._id)}
          >
            <Box p={2} cursor="pointer" my={2}>
              <Text color="gray.500">
                {postedDate(job.updated_at)}
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
  const data = await indexJobs({})

  return {
    props: {
      ...data,
      jobs: JSON.parse(JSON.stringify(data.jobs))
    }
  }
}

export default Home
