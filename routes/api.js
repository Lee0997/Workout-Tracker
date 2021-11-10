const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get(`/`, async (req, res) => {
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

router.put("/:id", async (req, res) => {
  try {
    const updatedExercise = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } },
      { new: true }
    );
    res.status(200).json(newExercise);
  } catch (error) {
    res.json(error);
  }
});

router.get(`/range`, async (req, res) => {
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

router.post('/', async (req, res) => {
    try {
        const newExercise = await Workout.create(body);
        res.status(200).json(newExercise);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;
