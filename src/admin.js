import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState('');

  // Fetch all members from the server when the component mounts
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      // Send a GET request to fetch all members
      const response = await fetch('http://localhost:3001/api/allMembers');

      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      } else {
        console.error('Error fetching members');
      }
    } catch (error) {
      console.error('Error fetching members:', error.message);
    }
  };

  const handleDeleteMember = async (memberID) => {
    try {
      // Send a DELETE request to delete the member
      const response = await fetch(`http://localhost:3001/api/deleteMember/${memberID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Member deleted successfully'); // Display a success message
        fetchMembers(); // Fetch updated member list
      } else {
        alert('Error deleting member. Please try again.'); // Display an error message
      }
    } catch (error) {
      console.error('Error deleting member:', error.message);
      alert('Error deleting member. Please try again.'); // Handle any network or other errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to add the member
      const response = await fetch('http://localhost:3001/api/addMember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberName }),
      });

      if (response.ok) {
        alert('Member added successfully');
        setMemberName('');
        fetchMembers(); // Fetch updated member list
      } else {
        alert('Error adding member. Please try again.');
      }
    } catch (error) {
      console.error('Error adding member:', error.message);
      alert('Error adding member. Please try again.');
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <Link to="/register">
        <button>Add Staff</button>
      </Link>
      <button>Remove Staff</button>

      {/* Add Member Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Member Name:
          <input
            type="text"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Member to List</button>
      </form>

      {/* List of Members */}
      <h2>Members List</h2>
      <ul>
        {members.map((member) => (
          <li key={member.memberID}>
            {member.memberNames}
            <button onClick={() => handleDeleteMember(member.memberID)}>Delete from List</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
