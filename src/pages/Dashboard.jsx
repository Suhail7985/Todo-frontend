import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
// import  API_URL  from "./env";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ✅ Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/todos/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos", err);
    }
  };

  useEffect(() => {
    if (!token || !userId) return navigate("/");
    fetchTodos();
  }, []);

  // ✅ Add todo
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      await axios.post(
        `${API_URL}/api/todos`,
        { task, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTask("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo", err);
    }
  };

  // ✅ Toggle status
  const toggleStatus = async (id, currentStatus) => {
  try {
    await axios.patch(
      `${API_URL}/api/todos/${id}`,
      { status: !currentStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTodos();
  } catch (err) {
    console.error("Error updating todo", err);
  }
};
  // ✅ Delete todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  return (
    <>
      
      <div className="dashboard">
        <h2>Welcome to your Dashboard</h2>

        <form onSubmit={handleAdd}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter new task"
            required
          />
          <button type="submit">Add</button>
        </form>

        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item">
              <span className={todo.status ? "completed" : "pending"}>
                {todo.task} {todo.status === true || todo.status === "true" ? "✅" : "⏳"}
              </span>

              <div className="todo-actions">
                <button
                  className="complete-btn"
                  onClick={() => toggleStatus(todo._id, todo.status)}
                >
                  {todo.status === true || todo.status === "true" ? "Mark as Pending" : "Mark as Completed"}

                </button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        
      </div><br></br><br></br> <br></br>
      
    </>
  );
}