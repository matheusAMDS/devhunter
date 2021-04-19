import { useSWRInfinite } from "swr"
import axios from "axios"

import { IndexJobsResult } from "lib/jobs/services/indexJobs"
import { Job } from "./model"
import { useEffect, useState } from "react"

interface UseJobsParams {
  label?: string 
  location?: string
  initialData?: IndexJobsResult
}

export default function useJobs(params: UseJobsParams) {
  const { initialData, label, location } = params
  const [ jobs, setJobs ] = useState<Job[]>(initialData.jobs || [])
  const [ hasMore, setHasMore ] = useState(true)

  const getKey = (index: number, prevData: IndexJobsResult) => {
    if (prevData && !prevData.hasNextPage) 
      return null 

    let url = `/api/jobs?page=${index}`
    
    if (label)
      url += `&label=${label}`

    if (location)
      url += `&location=${location}`

    return url
  }

  const fetcher = async (url: string) => {
    const response = await axios.get<IndexJobsResult>(url)

    return response.data
  }

  const { data, error, size, setSize } = useSWRInfinite<IndexJobsResult>(getKey, fetcher, {
    initialData: [initialData]
  })

  useEffect(() => {
    setJobs(data.reduce((prev, result) => prev.concat(result.jobs), []))
    setHasMore(data[data.length - 1].hasNextPage)
  }, [data])

  return {
    jobs,
    loading: !data && !error,
    error,
    hasMore,
    loadMore: () => {
      setSize(size + 1)
    }
  }
}

