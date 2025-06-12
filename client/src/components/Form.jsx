import { useState } from "react";

function Form({ addTodo }) {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return; // Prevent adding empty todos
    addTodo(todo);
    setTodo(""); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700 placeholder-gray-400 text-base"
      />
      <button
        type="submit"
        className="bg-primary text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75 transition duration-200 ease-in-out text-base"
      >
        Add Task
      </button>
    </form>
  );
}

export default Form;
