import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(null); // Track the student ID being edited
  const [editedData, setEditedData] = useState({}); // Store the edited data

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8080/getUsers');
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleEdit = (studentId) => {
    // Set the edit mode and initialize editedData with the current student's data
    setEditMode(studentId);
    const student = students.find((student) => student.STDID === studentId);
    setEditedData({ ...student });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/updateUser/${editMode}`, editedData);
      setEditMode(null); // Exit edit mode
      // Refresh the data after update
      fetchData();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8080/deleteUser/${studentId}`);
      setStudents((prevStudents) => prevStudents.filter((student) => student.STDID !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleInputChange = (e, field) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="w-[50rem] bg-white text-black drop-shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">Student Data</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Student ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">CGPA</th>
            <th className="border border-gray-300 px-4 py-2">Semester</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.STDID}>
              <td className="border border-gray-300 px-4 py-2">{student.STDID}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editMode === student.STDID ? (
                  <input
                    type="text"
                    value={editedData.Name}
                    onChange={(e) => handleInputChange(e, 'Name')}
                  />
                ) : (
                  student.Name
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editMode === student.STDID ? (
                  <input
                    type="text"
                    value={editedData.CGPA}
                    onChange={(e) => handleInputChange(e, 'CGPA')}
                  />
                ) : (
                  student.CGPA
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editMode === student.STDID ? (
                  <input
                    type="text"
                    value={editedData.Semester}
                    onChange={(e) => handleInputChange(e, 'Semester')}
                  />
                ) : (
                  student.Semester
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editMode === student.STDID ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 mr-2"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 mr-2"
                    onClick={() => handleEdit(student.STDID)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => handleDelete(student.STDID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
