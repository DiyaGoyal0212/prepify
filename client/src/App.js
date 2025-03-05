import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from './context';
import SummaryApi from "./commonapi";
import { setUserDetails } from "./store/userSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      console.log("Fetching user details..."); // Debugging log

      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      const data = await response.json();
      console.log("User data:", data); // Debugging log

      if (data.success) {
        dispatch(setUserDetails(data.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Context.Provider value={{ fetchUserDetails }}>
      <ToastContainer />
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </Context.Provider>
  );
}

export default App;
