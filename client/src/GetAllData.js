import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GetAllData = () => {
  const [messsage, setMessage] = useState({});

  const navigate = useNavigate();
  const getData = () => {
    axios
      .get("http://localhost:5000/getAllData", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setMessage(res.data);
      })
      .catch((err)=>{
        console.log(err);
        navigate("/")
      });
  };

  useEffect(()=>{
    getData();
  },[])

  return (
    <div>
      <h1>This is your data</h1>
      <p>Name : {messsage.name}</p>
      <p>Age : {messsage.age}</p>
    </div>
  );
};

export default GetAllData;
