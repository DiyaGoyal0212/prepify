import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import SummaryApi from "../commonapi/index";
import ROLE from "../commonapi/role";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [practiceDropdown, setPracticeDropdown] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.Logout_user.url, {
      method: SummaryApi.Logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <header style={{ width: "100%", backgroundColor: "#008080", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ height: "64px", maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", padding: "0 20px", justifyContent: "space-between" }}>
        
        {/* 🔹 Logo */}
        <div style={{ fontSize: "24px", fontWeight: "bold", textTransform: "uppercase", color: "white" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>Prepify</Link>
        </div>

        {/* 🔹 Navigation Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ position: "relative", cursor: "pointer" }} onMouseEnter={() => setPracticeDropdown(true)} onMouseLeave={() => setPracticeDropdown(false)}>
            <p style={{ fontWeight: "600", fontSize: "16px", color: "#e0f2f1" }}>Practice</p>
            {practiceDropdown && (
              <div style={{ position: "absolute", top: "30px", left: "0", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "10px", borderRadius: "5px", width: "120px" }}>
                <Link to="/cpp" style={{ display: "block", padding: "8px", textDecoration: "none", color: "black", borderRadius: "5px", hover: { backgroundColor: "#f0f0f0" } }}>C++</Link>
                <Link to="/java" style={{ display: "block", padding: "8px", textDecoration: "none", color: "black", borderRadius: "5px", hover: { backgroundColor: "#f0f0f0" } }}>Java</Link>
                <Link to="/react" style={{ display: "block", padding: "8px", textDecoration: "none", color: "black", borderRadius: "5px", hover: { backgroundColor: "#f0f0f0" } }}>React</Link>
              </div>
            )}
          </div>

          <Link to="/resume" style={{ fontWeight: "600", fontSize: "16px", color: "#e0f2f1", textDecoration: "none" }}>Resume</Link>
          <Link to="/interview" style={{ fontWeight: "600", fontSize: "16px", color: "#e0f2f1", textDecoration: "none" }}>Schedule</Link>
          <Link to="/Test" style={{ fontWeight: "600", fontSize: "16px", color: "#e0f2f1", textDecoration: "none" }}>Test</Link>
          <Link to="/options" style={{ fontWeight: "600", fontSize: "16px", color: "#e0f2f1", textDecoration: "none" }}>Interiew</Link>
        </nav>

        {/* 🔹 Profile & Authentication */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {user?._id && (
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setMenuDisplay((prev) => !prev)}>
              {user?.profilePic ? (
                <img src={user?.profilePic} style={{ width: "40px", height: "40px", borderRadius: "50%" }} alt={user?.name} />
              ) : (
                <FaRegCircleUser style={{ fontSize: "24px", color: "#e0f2f1" }} />
              )}

              {menuDisplay && (
                <div style={{ position: "absolute", right: "0", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "10px", borderRadius: "5px", width: "140px", top: "45px" }}>
                  {user?.role === ROLE.ADMIN && (
                    <Link to={"/admin-panel"} style={{ display: "block", padding: "8px", textDecoration: "none", color: "black", borderRadius: "5px", hover: { backgroundColor: "#f0f0f0" } }}>Admin Panel</Link>
                  )}
                  <button onClick={handleLogout} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px", border: "none", backgroundColor: "transparent", color: "red", borderRadius: "5px", cursor: "pointer" }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {!user?._id && (
            <Link to={"/login"} style={{ backgroundColor: "#006666", color: "white", padding: "10px 20px", borderRadius: "20px", textDecoration: "none", fontSize: "14px", fontWeight: "bold", hover: { backgroundColor: "#004d4d" } }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
