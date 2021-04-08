import { getModelForClass, prop } from "@typegoose/typegoose"
import { Base } from "@typegoose/typegoose/lib/defaultClasses"
import { WhatIsIt } from "@typegoose/typegoose/lib/internal/constants"

export class Job extends Base {
  @prop({ type: () => String })
  title: string 

  @prop({ type: () => String })
  body: string 

  @prop({ type: () => String, required: false })
  company?: string 

  @prop({ type: () => String })
  location: string 

  @prop({ type: () => Boolean })
  open: boolean 

  @prop({ type: () => String })
  github_id: number 

  @prop({ type: () => String })
  state: string 

  @prop({ type: () => Number, expires: 3888000 })
  created_at: number 

  @prop({ type: () => Number })
  updated_at: number  

  @prop({ type: () => [String] }, WhatIsIt.ARRAY)
  labels: string[]
}

export const JobModel = getModelForClass(Job)