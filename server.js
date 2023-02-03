const mongoose = require('mongoose')
const express = require('express')
const blogsRouter = require('./routes/blogs')
const blogRouter = require('./routes/blog')
const imageRouter = require('./routes/images')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 4040

try {
  mongoose.connect(
    process.env.BLOGDB_CONNECTION_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('connected to mongoose')
    }
  )
}
catch (err) {
  console.log("could not connect");
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
)
app.use('/blogs', blogsRouter)
app.use('/blog', blogRouter)
app.use('/image', imageRouter)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} `)
})
