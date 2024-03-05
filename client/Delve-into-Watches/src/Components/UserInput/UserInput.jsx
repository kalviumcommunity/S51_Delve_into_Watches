import React, { useState } from "react";
import axios from "axios";
import "./UserInput.css";
import { useNavigate } from "react-router-dom";

const UserInput = () => {
  const [formData, setFormData] = useState({
    WatchID: "", // Updated to match the provided data
    ModelName: "", // Updated to match the provided data
    Company: "", // Updated to match the provided data
    ProducedYear: "", // Updated to match the provided data
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
      // Sending data to the server using axios post request
      console.log(formData);
      const res = await axios.post("https://delve-into-watches.onrender.com/post", formData);
      navigate('/')
      // Logging the response data to the console
      console.log(res.data);
    } catch (error) {
      // Handling errors
      console.error("Error during form submission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="input">
      <label>
        Watch ID:
        <input type="text" name="WatchID" value={formData.WatchID} onChange={handleChange} />
      </label>
      <br />

      <label>
        Model Name:
        <input type="text" name="ModelName" value={formData.ModelName} onChange={handleChange} />
      </label>
      <br />

      <label>
        Company:
        <input type="text" name="Company" value={formData.Company} onChange={handleChange} />
      </label>
      <br />

      <label>
        Produced Year:
        <input type="number" name="ProducedYear" value={formData.ProducedYear} onChange={handleChange} />
      </label>
      <br />


      <button id="submit" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UserInput;
