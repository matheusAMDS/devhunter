import mongoose from "mongoose"

import { MONGODB_URI } from "config"

export default async () => {
  if (mongoose.connection.readyState > 0)
    return 

  return mongoose.connect(MONGODB_URI, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  })
}