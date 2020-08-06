const mongoose = require('mongoose')

const liftsSchema = new mongoose.Schema({
  lift: {
    name: String,
    weight: Number,
    reps: Number,
    sets: Number,
    required: false
  }
})

const workoutSchema = new mongoose.Schema({
  bodyPart: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  liftsSchema: liftsSchema
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout
