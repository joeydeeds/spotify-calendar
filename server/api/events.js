const router = require('express').Router()
const { Event } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll()
    res.json(events)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const createEvent = await Event.create(req.body)
    res.json(createEvent)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Event.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  console.log(req.params.id)
  console.log(req.body)
  try {
    const updateEvent = await Event.update(
      {
        title: req.body.title,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        description: req.body.description,
        date: req.body.date,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    res.json(updateEvent)
  } catch (err) {
    next(err)
  }
})
