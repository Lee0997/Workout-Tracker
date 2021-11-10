const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  exercises: [
    {
      type: { String, 
        required: "type required" 
      },
      name: {
        type: String,
        required: "name required",
      },
      duration: {
        type: Number,
        required: "duration required",
      },
      reps: Number,
      distance: Number,
      sets: Number,
      weight: Number,
    },
  ],
  day: {
    type: Date,
    default: Date.now,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
