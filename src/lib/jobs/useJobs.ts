import useSWR from "swr"
import axios from "axios"

import { IndexJobsResult } from "lib/jobs/services/indexJobs"
import { useEffect, useState } from "react"

interface UseJobsParams {
  label?: string 
  location?: string
  initialData?: IndexJobsResult
}

export default function useJobs(params: UseJobsParams) {
  const { initialData, label, location } = params
  const { hasNextPage, jobs, nextPage } = initialData

  const { data, error } = useSWR(
    ["jobs", label, location], 
    async () => {
      const response = await axios.get<IndexJobsResult>("/api/jobs", {
        params: {
          label,
          location
        }
      })

      return response.data
    }, 
    { 
      initialData: {
        jobs,
        hasNextPage,
        nextPage
      }
    }
  )

  return {
    data,
    loading: !data && !error,
    error
  }
}

