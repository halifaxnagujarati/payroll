import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Admin = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <Link to="/register">
        <button>Add Staff</button>
      </Link>
      <button>Remove Staff</button>
    </div>
  );
};

export default Admin;
