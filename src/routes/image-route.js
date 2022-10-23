const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image-process-controller");

/* GET image */
router.get("/", imageController.getImage);

module.exports = router;
