import mongoose from "mongoose"

export const connectDatabase = () => {
  try {
    mongoose.connect(process.env.DB_URL!)
  } catch (e) {
    const err = e as Error
    console.log(err.message)
  }
}