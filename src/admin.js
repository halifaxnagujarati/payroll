import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState('');
  const [showStaffList, setShowStaffList] = useState(false);
  const [user, setUser] = useState([]);


  // Fetch all members from the server when the component mounts
  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try{
      //Send a GET request to fetch all staff members
      const response = await fetch('http://localhost:3001/api/allStaff');

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Error fetching staff members');
      }
    } catch (error) {
      console.error('Error fetching staff members:', error.message);
    }
  };

  const handleShowStaffList = () => {
    setShowStaffList(!showStaffList);
  };

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

  const handleDeleteStaff = async (empID) => {
    try {
      // Send a DELETE request to delete the staff

      const response = await fetch(`http://localhost:3001/api/deleteStaff/${empID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Member deleted successfully'); // Display a success message
        fetchStaff(); // Fetch updated member list
      } else {
        alert('Error deleting staff. Please try again.'); // Display an error message
      }
    } catch (error) {
      console.error('Error deleting staff:', error.message);
      alert('Error deleting staff. Please try again.'); // Handle any network or other errors
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
      <button onClick={handleShowStaffList}>
      {showStaffList ? 'Hide Staff List' : 'Remove Staff'}
    </button>

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

      {/* Conditionally render the staff list */}
    {showStaffList && (
      <>
        <h2>Staff List</h2>
        <ul>
      {user.map((users) => (
        <li key={users.empID}>
          {users.firstName} {users.lastName} {users.location}
          <button onClick={() => handleDeleteStaff(users.empID)}>Remove Staff</button>
        </li>
      ))}
    </ul>
      </>
    )}

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
