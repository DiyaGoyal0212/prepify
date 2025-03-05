import React, { useState } from "react";
import loginIcons from "../../assets/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../../helpers/imageTobase64";
import SummaryApi from "../../commonapi/index";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imagePic = await imageTobase64(file);
        setData((previous) => ({
          ...previous,
          profilePic: imagePic,
        }));
      } catch (error) {
        console.error("Error converting image to base64", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Passwords don't match! Please check again.");
    }
  };

  return (
    <section style={{ padding: "50px 0", background: "#008080", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "white", padding: "30px", maxWidth: "400px", width: "100%", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        
        {/* Profile Image */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ width: "100px", height: "100px", margin: "0 auto", borderRadius: "50%", overflow: "hidden", position: "relative" }}>
            <img src={data.profilePic || loginIcons} alt="Profile" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
            <label style={{ position: "absolute", bottom: "0", width: "100%", background: "#e0e0e0", fontSize: "12px", textAlign: "center", padding: "4px", cursor: "pointer" }}>
              Upload Photo
              <input type="file" style={{ display: "none" }} onChange={handleUpload} accept="image/*" />
            </label>
          </div>
        </div>

        <h2 style={{ textAlign: "center", color: "#008080", marginBottom: "10px" }}>Create an Account</h2>
        <p style={{ textAlign: "center", color: "#005f5f", marginBottom: "20px" }}>Please fill in your details to sign up</p>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#008080", fontSize: "14px", display: "block", marginBottom: "5px" }}>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", outline: "none" }}
              required
            />
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#008080", fontSize: "14px", display: "block", marginBottom: "5px" }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", outline: "none" }}
              required
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "15px", position: "relative" }}>
            <label style={{ color: "#008080", fontSize: "14px", display: "block", marginBottom: "5px" }}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", outline: "none" }}
              required
            />
            <span style={{ position: "absolute", right: "10px", top: "35px", cursor: "pointer", color: "#008080" }} onClick={() => setPassword(prev => !prev)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: "15px", position: "relative" }}>
            <label style={{ color: "#008080", fontSize: "14px", display: "block", marginBottom: "5px" }}>Confirm Password</label>
            <input
              type={confirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleOnChange}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", outline: "none" }}
              required
            />
            <span style={{ position: "absolute", right: "10px", top: "35px", cursor: "pointer", color: "#008080" }} onClick={() => setConfirmPassword(prev => !prev)}>
              {confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Signup Button */}
          <div style={{ marginTop: "20px" }}>
            <button style={{ background: "#008080", color: "white", padding: "10px 15px", width: "100%", borderRadius: "5px", border: "none", cursor: "pointer" }}>
              Sign Up
            </button>
          </div>
        </form>

        <p style={{ textAlign: "center", color: "#008080", marginTop: "15px" }}>
          Already have an account? <Link to="/login" style={{ color: "#005f5f", textDecoration: "underline" }}>Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
