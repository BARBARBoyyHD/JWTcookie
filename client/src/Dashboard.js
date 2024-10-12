// Dashboard.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const seeMyData = ()=>{
    navigate("/GetAllData")
  }
  const deleteCookie = () => {
    axios
      .get("http://localhost:5000/deleteCookie", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        // Redirect to login or home page after cookie is deleted
        navigate("/");
      })
      .catch((err) => {
        console.error("Error deleting cookie:", err);
      });
  };

  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        credentials: "include", // Ensures cookies (accessToken) are sent
      });

      if (!res.ok) {
        // If response is not ok, navigate to login or home page
        navigate("/");
      }

      const data = await res.text(); // Assuming the server returns a string
      setMessage(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []); // Remove deleteCookie() from here

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
      <button
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={deleteCookie} // Only delete cookie on button click
      >
        Logout
      </button>
      <button 
       style={{
        backgroundColor: "Green",
        color: "white",
        padding: "10px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
      onClick={seeMyData}>See Your Data</button>
    </div>
  );
};

export default Dashboard;
