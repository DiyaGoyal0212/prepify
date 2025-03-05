const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Video", VideoSchema);
