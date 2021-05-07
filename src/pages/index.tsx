import Head from 'next/head'
import { Box, Button, Container, Divider, Flex, Heading, Input, Stack, Tag, Text } from "@chakra-ui/react"
import { formatDistanceToNow } from "date-fns"
import brLocale from "date-fns/locale/pt-BR"
import { MdLocationCity } from "react-icons/md"
import NextLink from "next/link"
import { GetServerSideProps } from 'next'
import { useRouter } from "next/router"
import { useForm } from 'react-hook-form'

import Layout from "components/Layout"
import { indexJobs } from 'lib/jobs/services/indexJobs'
import { IJob } from "lib/jobs/model"
import useJobs from "lib/jobs/useJobs"

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

  const postedDate = (date: Date) => {
    const distance = formatDistanceToNow(new Date(date), {
      locale: brLocale,
      addSuffix: false
    })

    return "Há " + distance + " atrás"
  }

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
                <Box p={2} cursor="pointer" my={2}>
                  <Text color="gray.500">
                    {postedDate(job.updatedAt)}
                  </Text>
                  <Heading mb={1} size="lg">{job.title}</Heading>
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
