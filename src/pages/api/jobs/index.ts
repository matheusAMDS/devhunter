import { NextApiRequest, NextApiResponse } from "next"

import { indexJobs } from "lib/jobs/services/indexJobs"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const page = Number(req.query.page)
  const label = req.query.label as string
  const location = req.query.location as string 

  const data = await indexJobs({ 
    page: page || 0,
    label,
    location
  })

  return res.json(data)
}