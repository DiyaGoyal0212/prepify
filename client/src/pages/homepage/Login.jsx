import React, { useContext, useState } from 'react';
import loginIcons from "../../assets/signin.gif";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../../commonapi/index';
import { toast } from 'react-toastify';
import Context from '../../context';
import "../../styles/login.css"; // Import the new CSS file

const Login = () => {
  const [showPassword, setPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include", // ✅ Ensures cookies are sent
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    const dataApi = await response.json();
  
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <section className="login-container">
      <div className="login-box">
        <div className="login-image">
          <img src={loginIcons} alt="login" />
        </div>

        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Please log in to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter Email" 
              name="email" 
              value={data.email} 
              onChange={handleOnChange} 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-container">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter Password" 
                name="password" 
                value={data.password} 
                onChange={handleOnChange} 
              />
              <div className="toggle-password" onClick={() => setPassword(prev => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <Link to={'/forgot-password'} className="forgot-password">Forgot Password?</Link>
          </div>

          <button className="login-btn">Login</button>
        </form>

        <p className="signup-text">
          Don't have an account? 
          <Link to={"/signup"} className="signup-link"> Sign up</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
