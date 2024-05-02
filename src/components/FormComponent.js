import React, { useState, useEffect } from 'react';
import API from './Api'; 

const FormComponent = () => {
  const [formData, setFormData] = useState({
    // Your form fields here
    name: '',
    description: '',
  });

  // Load data from local storage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Update local storage when formData changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send data to the backend using your API
    await API.createYarn(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
