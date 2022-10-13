const mongoose = require('mongoose')
const express = require('express')
const blogsRouter = require("./routes/blogs")
const blogRouter = require("./routes/blog")
const imageRouter = require("./routes/images")
require('dotenv').config()

const app = express()
const port = 4040

mongoose.connect(
  process.env.BLOGDB_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to database')
  }
)
app.use("/blogs",blogsRouter)
app.use("/blog",blogRouter)
app.use("/image",imageRouter)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} `)
})
