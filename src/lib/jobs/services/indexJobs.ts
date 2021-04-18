import dbConnect from "lib/mongodb"
import { Job, JobModel } from "lib/jobs/model"

interface IndexJobsParams {
  page?: number
  label?: string
  location?: string
}

export interface IndexJobsResult {
  jobs: Job[]
  hasNextPage: boolean 
  nextPage: number
}

export async function indexJobs({ page=0, label, location }: IndexJobsParams) {
  await dbConnect()

  const JOB_PER_PAGE = 15

  const fields = 
    ["title", "created_at", "updated_at", "company", "location", "labels"]

  let query: Object = {
    open: true
  }

  if (label)
    query = {
      ...query,
      labels: label
    }

  if (location) 
    query = {
      ...query,
      location
    }
   
  const total = await JobModel.find(query).countDocuments()
  const jobs = await JobModel
    .find(query, fields)
    .sort({ updated_at: -1 })
    .skip(JOB_PER_PAGE * page)
    .limit(JOB_PER_PAGE)

  const totalJobsLoaded = jobs.length + JOB_PER_PAGE * page
  
  return {
    jobs,
    hasNextPage: totalJobsLoaded < total,
    nextPage: totalJobsLoaded < total ? page + 1 : null
  }
}