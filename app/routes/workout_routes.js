const express = require('express')
const router = express.Router()
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })


const Workout = require('./../models/workout')

// Create
router.post('/workouts', requireToken, (req, res, next) => {
  req.body.workout.owner = req.user.id
  const workoutData = req.body.workout
  Workout.create(workoutData)
    .then(workout => {
      return res.status(201).json({workout: workout})
    })
    .catch(next)
})
