import { Badge, Box, Divider, Heading, Stack, Tag, Text } from "@chakra-ui/react"
import { formatDistanceToNow } from "date-fns"
import brLocale from "date-fns/locale/pt-BR"
import React, { forwardRef } from "react"

import { IJob } from "lib/jobs/model"
import { MdLocationCity } from "react-icons/md"

interface Props {
  job: IJob
  onClick?: () => void
}

const JobItem = forwardRef<HTMLDivElement, Props>(({ job, onClick }, ref) => {
  const postedDate = (date: Date) => {
    const distance = formatDistanceToNow(new Date(date), {
      locale: brLocale,
      addSuffix: false
    })

    return "Há " + distance + " atrás"
  }

  return (
    <Box p={2} cursor="pointer" my={2} ref={ref} onClick={onClick}>
      <Text color="gray.500">
        {postedDate(job.updatedAt)}
      </Text>
      <Heading mb={1} size="lg">
        {job.title}
        {job.work_regimes.map(work_regime => (
          <Badge
            colorScheme="yellow"
            key={work_regime}
            fontSize="small"
            ml={2} p={1}
          >
            {work_regime}
          </Badge>
        ))}
        {job.seniority.map(seniority => (
          <Badge
            colorScheme="blue"
            key={seniority}
            fontSize="small"
            ml={2} p={1}
          >
            {seniority}
          </Badge>
        ))}
      </Heading>
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
        <Divider mt={5} />
      </Box>
    </Box>
  )
})

export default JobItem