const router = require('express').Router()
const Blog = require('../model/blog')

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0
    const limit = parseInt(req.query.limit) || 5
    const search = req.query.search || ''
    let sort = parseInt(req.query.sort) || -1
    let genre = req.query.genre || 'All'
    let pageno=[1]
    const genreOptions = [
      'hacking',
      'coding',
      'neovim',
      'tech Trends',
      'artificial Intelligence',
      'product Reviews',
      'tutorials',
      'programming Languages',
      'tech Conferences',
      'news in Tech',
    ]

    genre === 'All'
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(','))

    const blogs = await Blog.find({ title: { $regex: search, $options: 'i' } })
      .where('genre')
      .in([...genre])
      .sort({ date: sort })
      .skip(page * limit)
      .limit(limit)
      .select('title description date genre images')

    const total = await Blog.countDocuments({
      genre: { $in: [...genre] },
      title: { $regex: search, $options: 'i' },
    })

     let totalpage = total / limit
      if (totalpage > 1) {
        for (let i = 1; i < totalpage; i++) {
          pageno.push(i + 1)
        }
      }
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      blogs,
      pageno,
    }
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err.message)
  }
})
module.exports = router
