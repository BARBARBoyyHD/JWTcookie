import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
function Home() {
  const navigate = useNavigate();
  const createCookie = () => {
    axios.get("http://localhost:5000", { withCredentials: true })
    .then((res)=>{
      console.log(res.data);
      navigate("/Dashboard");
    });
  };

  const deleteCookie = () => {
    axios.get("http://localhost:5000/deleteCookie", { withCredentials: true })
    .then((res)=>{
      console.log(res.data);
    });
  };

  return (
    <div className="Home">
      <h1>Learn JWT Cookie</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={createCookie}
        >
          Login
        </button>
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Renew Cookies
        </button>
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={deleteCookie}
        >
          Delete Cookies
        </button>
      </div>
    </div>
  );
}

export default Home;
