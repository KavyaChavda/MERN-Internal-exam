import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResumesPage = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resumes');
        setResumes(response.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div>
      <h1>Submitted Resumes</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Resume</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume) => (
            <tr key={resume._id}>
              <td>{resume.name}</td>
              <td>{resume.email}</td>
              <td>
                <a href={resume.resumeUrl} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </td>
              <td>
                {/* Optional Delete Button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResumesPage;
