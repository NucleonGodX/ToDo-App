import { useState } from "react";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa"; // Assuming react-icons is installed

function ToDoItem({ todo, deleteTodo, toggleComplete, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      if (editedText.trim() !== "" && editedText !== todo.text) {
        editTodo(todo.id, editedText);
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  return (
    <div
      className={`
      flex items-center justify-between p-4 rounded-lg shadow-custom-light transition-all duration-300 ease-in-out
      ${
        todo.completed
          ? "bg-gray-100 border border-gray-200"
          : "bg-card-light border border-gray-100"
      }
    `}
    >
      <div className="flex items-center flex-grow min-w-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary transition duration-150 ease-in-out cursor-pointer"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleEdit} // Save on blur
            onKeyDown={handleKeyDown} // Save on Enter
            className="ml-3 flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700 text-base"
            autoFocus
          />
        ) : (
          <span
            className={`
              ml-3 text-lg font-medium break-words text-gray-800
              ${todo.completed ? "line-through text-gray-500" : ""}
              cursor-pointer flex-grow
            `}
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex space-x-3 ml-4">
        <button
          onClick={handleEdit}
          className="text-primary hover:text-primary-dark transition duration-200 ease-in-out focus:outline-none text-xl"
          title={isEditing ? "Save Task" : "Edit Task"}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-danger hover:text-red-600 transition duration-200 ease-in-out focus:outline-none text-xl"
          title="Delete Task"
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default ToDoItem;
