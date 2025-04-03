import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {
  const [resumes, setResumes] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    axios.get('/api/resumes')
      .then(response => {
        setResumes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('resume', resume);

    axios.post('/api/resumes', formData)
      .then(response => {
        setResumes([...resumes, response.data]);
        setName('');
        setEmail('');
        setResume(null);
        setResumeUrl('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/resumes/${id}`)
      .then(response => {
        setResumes(resumes.filter(resume => resume._id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Resume Submission Portal</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Resume:
          <input type="file" onChange={(event) => setResume(event.target.files[0])} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <h2>Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Resume</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume) => (
            <tr key={resume._id}>
              <td>{resume.name}</td>
              <td>{resume.email}</td>
              <td>
                <a href={resume.resumeUrl} target="_blank">View/Download</a>
              </td>
              <td>
                <button onClick={() => handleDelete(resume._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
