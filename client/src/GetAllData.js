import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetAllData = () => {
  const [data, setData] = useState([]); // Make sure it's initialized as an array to map over
  const navigate = useNavigate();

  const getData = () => {
    axios
      .get("http://localhost:5000/getAllData", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setData(res.data); // Set the fetched data into the correct state
      })
      .catch((err) => {
        console.log(err);
        navigate("/"); // Redirect on error
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>This is your data</h1>
      {data.map((item, id) => (
        <div key={id}>
          <p>Name: {item.name}</p>
          <p>Age: {item.age}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default GetAllData;
