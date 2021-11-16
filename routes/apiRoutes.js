const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", async (req, res) => {
  try {
    const dbExercises = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
          totalWeight: { $sum: "$exercises.weight" },
        },
      },
    ]).sort({ day: 1 });
    res.status(200).json(dbExercises);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/api/workouts/:id", async (req, res) => {
  try {
    console.log(req);
        const updatedExercise = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } },
      { new: true }
    );
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.json(error);
  }
});

router.get("/api/workouts/range", async (req, res) => {
  try {
    const dbExercises = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
          totalWeight: { $sum: "$exercises.weight" },
        },
      },
    ])
      .sort({ day: -1 })
      .limit(7);
    res.status(200).json(dbExercises);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/api/workouts", async (req, res) => {
    try {
      console.log(body);
        const newExercise = await Workout.create(body);
        res.status(200).json(newExercise);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;
