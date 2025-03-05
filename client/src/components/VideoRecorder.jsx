import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

// ✅ Styled Components
const VideoContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f4f4f4",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

const StyledButton = styled(Button)({
  marginTop: "15px",
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "25px",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const VideoRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState([]); // ✅ Default to empty array
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // ✅ Fetch User Videos on Mount
  useEffect(() => {
    fetchUserVideos();
  }, []);

  const fetchUserVideos = async () => {
    try {
      const token = localStorage.getItem("token");

if (!token) {
  console.error("Token not found in localStorage");
}

const res = await axios.get("http://localhost:8080/api/videos/my-videos", {
  headers: { Authorization: `Bearer ${token}` },
});


      console.log("Fetched Videos:", res.data); // ✅ Debugging log
      setVideos(res.data.videos || []); // ✅ Ensure it's an array
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]); // ✅ Prevent undefined errors
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);

    mediaRecorder.onstop = async () => {
      setUploading(true);
      const blob = new Blob(chunksRef.current, { type: "video/mp4" });
      const file = new File([blob], "interview.mp4", { type: "video/mp4" });
      const formData = new FormData();
      formData.append("video", file);

      try {
        const token = localStorage.getItem("token");
        const res = await axios.post("http://localhost:8080/api/videos/upload", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setVideos((prev) => [res.data.video, ...prev]); // ✅ Add new video
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setUploading(false);
      }

      stream.getTracks().forEach((track) => track.stop());
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <VideoContainer 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h5">🎥 Record Your Interview</Typography>
      <video 
        ref={videoRef} 
        autoPlay 
        style={{ width: "100%", borderRadius: "10px", border: "2px solid #ddd", marginBottom: "10px" }} 
      />

      <StyledButton
        variant="contained"
        color={recording ? "error" : "primary"}
        onClick={recording ? stopRecording : startRecording}
        component={motion.button}
        whileHover={{ scale: 1.1 }}
      >
        {recording ? "🛑 Stop Recording" : "🎬 Start Recording"}
      </StyledButton>

      {uploading && <CircularProgress style={{ marginTop: "10px" }} />}

      <Box mt={4} width="100%">
        <Typography variant="h6">📹 Your Recorded Videos</Typography>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            video?.videoUrl ? (  // ✅ Check if video exists and has videoUrl
              <motion.div
                key={video._id || index}  // ✅ Use index as fallback key
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ marginTop: "15px", textAlign: "center" }}
              >
                <video
                  src={video.videoUrl}
                  controls
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    border: "2px solid #ddd",
                  }}
                />
              </motion.div>
            ) : null
          ))
        ) : (
          <Typography>No videos recorded yet.</Typography>
        )}
      </Box>
    </VideoContainer>
  );
};

export default VideoRecorder;
