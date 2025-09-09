 
const router = require("express").Router();
const { addRating } = require("../controllers/ratingController");
const auth = require("../middleware/auth");

router.post("/", auth("user"), addRating);

module.exports = router;
