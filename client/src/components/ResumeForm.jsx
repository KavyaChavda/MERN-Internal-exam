import React, { useState } from 'react';
import axios from 'axios';

const ResumeForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('resume', resume);

    try {
      const response = await axios.post('http://localhost:5000/api/resumes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Resume submitted successfully');
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('Error submitting resume');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Submit Resume</button>
    </form>
  );
};

export default ResumeForm;
