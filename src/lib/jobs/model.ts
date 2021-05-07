import { getModelForClass, index, prop } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

export interface IJob extends Job { }

interface Job extends Base { }

@index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 21 })
class Job extends TimeStamps {
  @prop()
  title: string

  @prop()
  body: string

  @prop({ required: false })
  company?: string

  @prop()
  location: string

  @prop()
  open: boolean

  @prop()
  github_id: number

  @prop()
  state: string

  @prop({ type: () => Date })
  createdAt: Date

  @prop({ type: () => Date })
  updatedAt: Date

  @prop({ type: () => [String] })
  labels: string[]

  @prop({ type: () => [String] })
  work_regimes: string[]

  @prop({ type: () => [String] })
  seniority: string[]
}

export const JobModel = getModelForClass(Job)