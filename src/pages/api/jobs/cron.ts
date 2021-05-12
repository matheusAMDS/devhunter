import { NextApiRequest, NextApiResponse } from "next"

import dbConnect from "lib/mongodb"
import { fetchJobs } from "lib/jobs/fetchFromGithub"
import { JobModel } from "lib/jobs/model"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()

  const mostRecentJob = (await JobModel.find()
    .sort({ createdAt: -1 })
    .limit(1))[0]

  const jobs = mostRecentJob
    ? await fetchJobs({ since: mostRecentJob.createdAt.getTime() })
    : await fetchJobs({})

  await JobModel.insertMany(jobs)

  return res.status(201).json({ message: "sucess" })
}