const Video = require("../models/Video");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: "interview_videos", resource_type: "video", allowed_formats: ["mp4", "mov", "avi"] },
});

const upload = multer({ storage });

exports.uploadMiddleware = upload.single("video");

exports.uploadVideo = async (req, res) => {
  try {
    const userId = req.userId;
    if (!req.file) return res.status(400).json({ error: "No video uploaded" });

    const video = new Video({ title: req.body.title || "Untitled", videoUrl: req.file.path, user: userId });
    await video.save();
    res.status(201).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ error: "Error uploading video" });
  }
};

exports.getMyVideos = async (req, res) => {
  try {
    const userId = req.userId;
    const videos = await Video.find({ user: userId });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: "Error fetching videos" });
  }
};

exports.submitFeedback = async (req, res) => {
  try {
    const { videoId, feedback } = req.body;
    await Video.findByIdAndUpdate(videoId, { feedback });
    res.json({ success: true, message: "Feedback added!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding feedback" });
  }
};
