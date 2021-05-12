import Head from 'next/head'
import { Button, Container, Flex, Heading, Input, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { GetServerSideProps } from 'next'
import { useRouter } from "next/router"
import { useForm } from 'react-hook-form'

import Layout from "components/Layout"
import { indexJobs } from 'lib/jobs/services/indexJobs'
import { IJob } from "lib/jobs/model"
import useJobs from "lib/jobs/useJobs"
import JobItem from 'components/Job/JobItem'

interface Props {
  label?: string
  location?: string
  jobs: IJob[],
  hasNextPage: boolean,
  nextPage: number
}

interface FilterJobs {
  label?: string
  location?: string
}

const Home: React.FC<Props> = ({ label, location, ...initialData }) => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FilterJobs>()
  const { jobs, loadMore, hasMore, error } = useJobs({
    location,
    label,
    initialData
  })

  const handleFilter = handleSubmit(data => {
    if (data.label || data.location) {
      let url = "/?"

      if (data.label)
        url += "label=" + data.label

      if (data.location)
        url += "&location=" + data.location

      router.push(url)
    }
  })

  return (
    <Layout
      jumbotron={
        <Container maxW="container.lg" textAlign="center" my={5}>
          <Heading fontSize={["5xl", "6xl"]}>Bem vindo ao DevHunter</Heading>
          <Text fontSize={["x-large", "xx-large"]} mt={5} color="gray.200">
            Descubra diversas vagas de emprego exclusivas para desenvolvedores.
          </Text>
          <Flex
            as="form"
            onSubmit={handleFilter}
            mb={5} mt={10} mx="auto"
            w="full" maxW={650}
            justifyContent="space-around"
            flexWrap="wrap"
          >
            <Input
              placeholder="Skill ou outra tag"
              bg="gray.100"
              color="black"
              my={1}
              w="full" maxW={["full", "full", 64]}
              {...register("label")}
            />
            <Input
              placeholder="Localização"
              bg="gray.100"
              color="black"
              my={1}
              w="full" maxW={["full", "full", 64]}
              {...register("location")}
            />
            <Button
              colorScheme="green"
              my={1} w="full"
              maxW={["full", 'full', 24]}
              type="submit"
            >
              Pesquisar
            </Button>
          </Flex>
        </Container>
      }
    >
      <Head>
        <title>Home | DevHunter</title>
      </Head>
      <Container maxW="container.lg" py={5}>
        {error ? (
          <Heading>Erro ao carregar as vagas</Heading>
        ) : (
          <>
            {jobs.map(job => (
              <NextLink
                href="/jobs/[id]"
                as={`/jobs/${job._id}`}
                key={String(job._id)}
              >
                <JobItem job={job} />
              </NextLink>
            ))}
          </>
        )}
        <Button
          colorScheme="green"
          visibility={hasMore ? "visible" : "hidden"}
          onClick={loadMore}
        >
          Carregar Mais
        </Button>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const label = query.label as string
  const location = query.location as string

  const data = await indexJobs({
    label,
    location
  })

  return {
    props: {
      ...data,
      jobs: JSON.parse(JSON.stringify(data.jobs)),
      label: label || null,
      location: location || null
    }
  }
}

export default Home
