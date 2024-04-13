import React, { useState } from 'react';
import './submit.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Submit() {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    gender: '',
    phoneNumber: '',
    location: '',
    incidentDescription: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3007/createcase', formData);

      console.log(response.data);

      // Display success message
      toast.success('Form submitted successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });

      // Reset form data
      setFormData({
        name: '',
        idNumber: '',
        gender: '',
        phoneNumber: '',
        location: '',
        incidentDescription: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>Report an Incident</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="idNumber">ID Number:</label>
          <input type="text" id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} pattern="[0-9]{10}" maxLength="10" />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="incidentDescription">Incident Description:</label>
          <textarea id="incidentDescription" name="incidentDescription" value={formData.incidentDescription} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Submit;
