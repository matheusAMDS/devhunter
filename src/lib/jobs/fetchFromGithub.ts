import axios from "axios"

import { GITHUB_API_URL } from "config"

interface FetchJobsParams {
  since: Date
  repo: string 
  org: string
}

interface RawIssue {
  title: string 
  id: number 
  body: string
  created_at: Date 
  updated_at: Date
  state: string 
  labels: { 
    name: string 
  }[]
}

export interface ProcessedJob {
  title: string 
  github_id: number 
  body: string
  created_at: Date 
  updated_at: Date
  state: string 
  labels: string[]
  open: boolean 
  company: string 
  location: string
}

export async function fetchJobs({ since, org, repo }: FetchJobsParams) {
	const url = GITHUB_API_URL + `/repos/${org}/${repo}/issues`
	const response = await axios.get<RawIssue[]>(url, {
    params: {
      since
    }
  })
  
  const jobs = response.data
    .map(issue => convertIssueToJob(issue))
    .filter(issue => issue)

	return jobs
}

function convertIssueToJob(issue: RawIssue): ProcessedJob | null {
  const companyRegex = RegExp(/@\s*(.+)|na (.+)|no (.+)/)
  const locationRegex = RegExp(/\[(.+)\]\s/)

  const companyResult = issue.title.match(companyRegex)
  const locationResult = issue.title.match(locationRegex)

  if (companyResult && locationResult) {
    const title = issue.title
      .replace(companyRegex, "")
      .replace(locationRegex, "")
      .trim()

    return {
      github_id: issue.id,
      body: issue.body.split("## Labels")[0],
      labels: issue.labels.map(label => label.name),
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      state: issue.state,
      open: issue.state === "open",
      title,
      company: companyResult[1] || null,
      location: locationResult[1] || null
    }
  } else {
    return null
  }
  
}