const express = require("express");
const { uploadVideo, getMyVideos, uploadMiddleware, submitFeedback } = require("../controllers/videoController");
const authMiddleware = require("../middleware/authToken");

const router = express.Router();

router.post("/upload", authMiddleware, uploadMiddleware, uploadVideo);
router.get("/my-videos", authMiddleware, getMyVideos);
router.post("/feedback", submitFeedback);

module.exports = router;
