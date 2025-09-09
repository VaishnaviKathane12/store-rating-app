 
const router = require("express").Router();
const { createStore, getStores } = require("../controllers/storeController");
const auth = require("../middleware/auth");

router.post("/", auth("admin"), createStore); // only admin can add store
router.get("/", auth(), getStores);           // all logged-in users can view

module.exports = router;
