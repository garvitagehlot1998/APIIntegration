import React, { useState, useEffect } from "react";

const UsersList = () => {
  // State to hold users data
  const [users, setUsers] = useState([]);
  // State to hold loading status
  const [loading, setLoading] = useState(true);
  // State to hold error messages
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch users data
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data); // Update state with fetched users
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUsers(); // Fetch users when the component mounts
  }, []); // Empty dependency array to run only once

  if (loading) {
    return <p>Loading...</p>; // Show loading message
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message
  }

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
