import { Container, Heading, IconButton, Stack, Tag } from "@chakra-ui/react"
import Layout from "components/Layout"
import Markdown from "components/Markdown"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { IoMdArrowRoundBack } from "react-icons/io"
import showJob from "lib/jobs/services/showJob"
import { Job } from "lib/jobs/model"

interface Props {
  job: Job
}

const JobDetails: React.FC<Props> = ({ job }) => {
  const router = useRouter()
  console.log(job)

  return (
    <Layout
      jumbotron={
        <Container maxW="container.lg" centerContent mt={5}>
          <Heading size="2xl">{job.title}</Heading>
          <Stack isInline spacing={1} mt={6}>
            {job.labels && job.labels.map(label => (
              <Tag key={label} variant="solid" colorScheme="green">
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
  const { job } = await showJob({ id: query.id as string })

  return {
    props: {
      job: JSON.parse(JSON.stringify(job))
    }
  }
}

export default JobDetails