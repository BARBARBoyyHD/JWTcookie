import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import Dashboard from "./Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>{" "}
        <Route path="/Dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
