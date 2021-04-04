import { Container, Heading, IconButton, Stack, Tag } from "@chakra-ui/react"
import Layout from "components/Layout"
import Markdown from "components/Markdown"
import { fetchJobs, ProcessedJob } from "lib/jobs/fetchFromGithub"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { IoMdArrowRoundBack } from "react-icons/io"

interface Props {
  job: ProcessedJob
}

const JobDetails: React.FC<Props> = ({ job }) => {
  const router = useRouter()

  return (
    <Layout
      jumbotron={
        <Container maxW="container.lg" centerContent mt={5}>
          <Heading size="2xl">{job.title}</Heading>
          <Stack isInline spacing={1} mt={6}>
            {job.labels.map(label => (
              <Tag key={label} variant="solid" colorScheme="blackAlpha">
                {label}
              </Tag>
            ))}
          </Stack>
        </Container>
      }
    >
      <Head>
        <title>{job.title} | DevHunter</title>
      </Head>
      <Container maxW="container.lg" py={8}>
        <IconButton 
          aria-label="go-back"
          icon={<IoMdArrowRoundBack />} 
          onClick={() => router.back()} 
        />
        <Markdown src={job.body} />
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const jobs = await fetchJobs({ 
    since: new Date("2021/04/02"),
    org: "backend-br",
    repo: "vagas"
  })
  const job = jobs.find(job => job.github_id === Number(query.id))

  return {
    props: {
      job
    }
  }
}

export default JobDetails