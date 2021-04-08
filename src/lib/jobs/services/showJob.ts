import dbConnect from "lib/mongodb"
import { JobModel } from "lib/jobs/model"

interface ShowJobParams {
  id: string
}

async function showJob({ id }: ShowJobParams) {
  await dbConnect()

  const job = await JobModel.findById(id)

  return { job }
}

export default showJob