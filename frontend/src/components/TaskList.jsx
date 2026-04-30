import { useState, useEffect } from "react";
import { getApiUrl } from "../utils/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${getApiUrl()}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (err) {
      setError("Failed to fetch tasks");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please sign in first");
      return;
    }

    try {
      const response = await fetch(`${getApiUrl()}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTask }),
      });
      if (response.ok) {
        setNewTask("");
        fetchTasks();
      } else {
        setError("Failed to add task");
      }
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${getApiUrl()}/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Tasks</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={addTask} className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center mb-2">
            <span>{task.title}</span>
            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white p-1"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;