import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import GetAllData from "./GetAllData";
import Home from "./home";
import Error404 from "./error/Error404";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>{" "}
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/GetAllData" element={<GetAllData />}></Route>
        <Route path="*" element={<Error404></Error404>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
