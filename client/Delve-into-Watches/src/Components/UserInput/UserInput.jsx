import React, { useState } from "react";
import axios from "axios";
import "./UserInput.css";
import { useNavigate } from "react-router-dom";

const UserInput = () => {
  const [formData, setFormData] = useState({
    WatchID: "", 
    ModelName: "", 
    Company: "", 
    ProducedYear: "", 
  });
  const navigate = useNavigate() 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      console.log(formData);
      const res = await axios.post("https://delve-into-watches.onrender.com/post", formData);
      navigate('/')
      
      console.log(res.data);
    } catch (error) {
      
      console.error("Error during form submission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="input">

      <label id="l">
        Watch ID :
        <input type="text" name="WatchID" value={formData.WatchID} onChange={handleChange} />
      </label>
      <br />

      <label id="l">
        Model Name : 
        <input type="text" name="ModelName" value={formData.ModelName} onChange={handleChange} />
      </label>
      <br />

      <label id="l">
        Company :
        <input type="text" name="Company" value={formData.Company} onChange={handleChange} />
      </label>
      <br />

      <label id="l">
        Produced Year :
        <input type="number" name="ProducedYear" value={formData.ProducedYear} onChange={handleChange} />
      </label>
      <br />


      <button id="submit" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UserInput;
