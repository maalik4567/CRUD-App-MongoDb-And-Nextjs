import { useState } from 'react';
import axios from 'axios';

const StdData = () => {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [cgpa, setCGPA] = useState('');
  const [semester, setSemester] = useState('');

  const handleInsert = async () => {
    try {
      await axios.post('http://localhost:8080/insertUser', {
        studentId,
        name,
        cgpa,
        semester
      });
      console.log('User inserted successfully');
      // You may want to clear the input fields after successful insertion
      setStudentId('');
      setName('');
      setCGPA('');
      setSemester('');
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  };

  return (
    <div className="mb-10 w-[50rem] bg-white text-black drop-shadow-2xl p-4">
      <h1 className="text-2xl font-bold mb-4">Student Data Form</h1>
      <div className="flex flex-col space-y-4">
        <label className="flex flex-col">
          <span className="text-sm">Student ID:</span>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border border-gray-400 px-4 py-2 rounded-lg"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm">Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 px-4 py-2 rounded-lg"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm">CGPA:</span>
          <input
            type="text"
            value={cgpa}
            onChange={(e) => setCGPA(e.target.value)}
            className="border border-gray-400 px-4 py-2 rounded-lg"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm">Semester:</span>
          <input
            type="text"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border border-gray-400 px-4 py-2 rounded-lg"
          />
        </label>
        <div className="flex justify-between">
          <button onClick={handleInsert} className="bg-green-500 text-white px-4 py-2 rounded-lg">
            INSERT
          </button>      
        </div>
      </div>
    </div>
  );
};

export default StdData;
