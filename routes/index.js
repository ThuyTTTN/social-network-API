//import all of the API routes to prefix their endpoint names and package them up
const router = require("express").Router();
const userRoutes = require("./api/users-routes");
const thoughtRoutes = require("./api/thoughts-routes");

//add prefix of '/users to routes created in user-routes.js
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
