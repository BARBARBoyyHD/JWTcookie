// Dashboard.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://localhost:5000/dashboard", {
          method: "GET",
          credentials: "include", // This will ensure cookies (accessToken) are sent
        });

        if (!response.ok) {
          navigate("/");
        }

        const data = await response.text();
        setMessage(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDashboard();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
