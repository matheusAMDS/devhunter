import Head from 'next/head'
import { Heading } from "@chakra-ui/react"

const Home: React.FC = () => {
  return (
    <>
    <Head>
      <title>Home | DevHunter</title>
    </Head>
    <Heading>
      Welcome to DevHunter
    </Heading>
    </>
  )
}

export default Home
