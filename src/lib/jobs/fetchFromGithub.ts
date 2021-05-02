import axios from "axios"

import { GITHUB_API_URL, GITHUB_JOB_REPOS } from "config"

interface FetchJobsParams {
  since?: number
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
  created_at: number
  updated_at: number
  state: string
  labels: string[]
  open: boolean
  company: string
  location: string
}

export async function fetchJobs({ since }: FetchJobsParams) {
  const calls = GITHUB_JOB_REPOS.map(({ org, repo }) => {
    const url = GITHUB_API_URL + `/repos/${org}/${repo}/issues`

    return axios.get<RawIssue[]>(url, since && {
      params: {
        since: new Date(since).toISOString()
      }
    })
  })

  const response = await axios.all(calls)
  const jobs = response
    .reduce((prev, actual) => prev.concat(actual.data), [])
    .filter(issue => !since || new Date(issue.created_at).getTime() > since)
    .map(issue => convertIssueToJob(issue))
    .filter(issue => issue)

  return jobs
}

function convertIssueToJob(issue: RawIssue): ProcessedJob | null {
  const companyRegex = RegExp(/@\s*(.+)|na (.+)/)
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
      created_at: new Date(issue.created_at).getTime(),
      updated_at: new Date(issue.updated_at).getTime(),
      state: issue.state,
      open: issue.state === "open",
      title,
      company: companyResult[1] || companyResult[2] || null,
      location: locationResult[1] || null
    }
  } else {
    return null
  }
}