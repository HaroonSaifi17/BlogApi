const router = require('express').Router()

router.get('/:name', (req, res) => {
  try {
    const name = req.params.name
    res.sendFile(`images/${name}`,{ root : './'})
  } catch (err) {
    res.status(500).json(err.message)
  }
})
module.exports = router
