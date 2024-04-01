import React, { useState } from 'react';
import './submit.css';

function Submit() {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(`Name: ${name}`);
    console.log(`ID Number: ${idNumber}`);
    console.log(`Gender: ${gender}`);
    console.log(`Phone Number: ${phoneNumber}`);
    console.log(`Location: ${location}`);
    console.log(`Incident Description: ${incidentDescription}`);
  };

  return (
    <div>
      <h1>Report an Incident</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="idNumber">ID Number:</label>
          <input type="text" id="idNumber" value={idNumber} onChange={(event) => setIdNumber(event.target.value)} />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
            <option value="">-- Select --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} pattern="[0-9]{10}" maxLength="10" />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" value={location} onChange={(event) => setLocation(event.target.value)} />
        </div>
        <div>
          <label htmlFor="incidentDescription">Incident Description:</label>
          <textarea id="incidentDescription" value={incidentDescription} onChange={(event) => setIncidentDescription(event.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Submit;