const express = require('express')
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

const Workout = require('./../models/workout')

// Create
router.post('/workouts', requireToken, (req, res, next) => {
  req.body.workout.owner = req.user.id
  const workout = req.body.workout
  Workout.create(workout)
    .then(workout => {
      res.status(201).json({workout: workout.toObject()})
    })
    .catch(next)
})

// UPDATE
router.patch('/workouts/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.workout.owner
  Workout.findById(req.params.id)
    .then(handle404)
    .then(workout => {
      requireOwnership(req, workout)
      return workout.updateOne(req.body.workout)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// INDEX
router.get('/workouts', requireToken, (req, res, next) => {
  Workout.find()
    .then(workouts => {
      return workouts.map(workout => workout.toObject())
    })
    .then(workouts => res.status(200).json({ workouts: workouts }))
    .catch(next)
})

// SHOW
router.get('workouts/:id', requireToken, (req, res, next) => {
  Workout.findById(req.params.id)
    .then(handle404)
    .then(workout => res.status(200).json({ workout: workout.toObject() }))
    .catch(next)
})

// DESTROY
router.delete('/workouts/:id', requireToken, (req, res, next) => {
  Workout.findById(req.params.id)
    .then(handle404)
    .then(workout => {
      requireOwnership(req, workout)
      workout.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
