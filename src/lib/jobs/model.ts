import { getModelForClass, prop } from "@typegoose/typegoose"
import { Base } from "@typegoose/typegoose/lib/defaultClasses"

export class Job extends Base {
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

  @prop({ expires: 3888000 })
  created_at: number

  @prop()
  updated_at: number

  @prop({ type: () => [String] })
  labels: string[]
}

export const JobModel = getModelForClass(Job)