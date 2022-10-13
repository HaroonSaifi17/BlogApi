const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
  title: String,
  discription: String,
  date: String,
  markdown: String,
  genre:[String],
  images:[String]
})
const Blog = mongoose.model('blogs',blogSchema)
module.exports = Blog
