const router = require('express').Router()
const fs = require('fs')
const Blog = require('../model/blog')
const multer = require('multer')
const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9)
    uniquename.push(uniqueName + '-' + file.originalname)
    cb(null, uniqueName + '-' + file.originalname)
  }
})
const upload = multer({ storage : storage })

let uniquename=[]

router.post('/add',upload.array('images',5) ,async (req, res) => {
  try {
    console.log(uniquename)
    const blog = new Blog({
      title: req.body.title,
      thumbail: uniquename[0],
      discription: req.body.description,
      date: new Date().toLocaleString(),
      markdown: req.body.markdown,
      genre: req.body.genre,
      images: uniquename
    })
    await Blog.create(blog)
    res.status(200).end()
  } catch (err) {
    res.status(500).json(err.message)
  }
})
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const blog = await Blog.find({ _id: id })
    res.status(200).json(blog)
  } catch (err) {
    res.status(500).json(err.message)
  }
})
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const imageName = await Blog.find({'_id':id}).select('images')
    imageName[0].images.forEach( (image) => {
          fs.unlink(`./images/${image}`,(err)=>{
        if (err) console.log(err)
      })
    });
    await Blog.remove({'_id':id})
    res.status(200).end()
  } catch (err) {
    res.status(500).json(err.message)
  }
})
router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Blog.update({'_id':id},req.body)
    res.status(200).end()
  } catch (err) {
    res.status(500).json(err.message)
  }
})
module.exports = router
