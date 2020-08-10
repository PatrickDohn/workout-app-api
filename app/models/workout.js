const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  bodyPart: {
    type: String,
    required: true
  },
  lift: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: false
  },
  reps: {
    type: Number,
    required: false
  },
  sets: {
    type: Number,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout
