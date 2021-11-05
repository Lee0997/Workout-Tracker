const router = require("express").Router();
const htmlRoutes = require("./htmlRoutes");
const apiRoutes = require("./api")

router.use("/", htmlRoutes);
router.use("/api/workouts", apiRoutes)

module.exports = router;