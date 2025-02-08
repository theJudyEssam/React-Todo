import React from 'react';
import Todo from "../Todo";
import { useAuth } from "../context/authContext";

function Homepage(props) {
  const { token, setToken, isAuthenticated } = useAuth();

  const handleLogout = () => {
    setToken(null);
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.reload();
  };

  return (
    <div className="homepage">
      {isAuthenticated ? (
        <>
          <h1 className="homepage-title">Welcome back to TodoBrownie</h1>

          <div className="todo-add">
            <input type="text" placeholder="Add a new task" />
            <button>Add</button>
          </div>
          <div className="todo-list">
            <Todo task="Feed the cat" />
            <Todo task="Clean the dishes" />
            <Todo task="Finish this react project" />
            <Todo task="Attend the Formula 1 meeting" />
          </div>

          <button className="logout" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Oops! You have not logged in yet.</p>
      )}
    </div>
  );
}

export default Homepage;