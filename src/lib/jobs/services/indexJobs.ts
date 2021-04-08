import dbConnect from "lib/mongodb"
import { JobModel } from "lib/jobs/model"

interface IndexJobsParams {
  page?: number
}

async function indexJobs({ page=0 }: IndexJobsParams) {
  await dbConnect()

  const JOB_PER_PAGE = 15

  const skippableDocs = JOB_PER_PAGE * page 
  const fields = 
    ["title", "created_at", "updated_at", "company", "location", "labels"]
    
  const total = await JobModel.countDocuments()
  const jobs = await JobModel
    .find({ open: true }, fields)
    .sort({ updated_at: -1 })
    .skip(skippableDocs)
    .limit(JOB_PER_PAGE)

  return {
    jobs,
    hasNextPage: skippableDocs < total,
    nextPage: skippableDocs < total ? null : page + 1
  }
}

export default indexJobs