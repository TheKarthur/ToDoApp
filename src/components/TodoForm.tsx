import React, { useState } from "react";

interface TodoFormProps {
  onAddTodo: (text: string, description: string, status: 'Not started' | 'In progress' | 'Completed' | 'On Hold') => void;
}
 
const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [status, setStatus] = useState<'Not started' | 'In progress' | 'Completed' | 'On Hold'>('Not started');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputDescription(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as 'Not started' | 'In progress' | 'Completed' | 'On Hold');
  };

  const handleAddButtonClick = () => {
    if (inputValue.trim() !== "" && inputDescription.trim() !== "") {
      onAddTodo(inputValue.trim(), inputDescription.trim(), status);
      setInputValue("");
      setInputDescription("");
      setStatus('Not started');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddButtonClick();
    }
  };

  return (
    <div className="d-flex mb-3 gap-2">
      <input
        className="form-control"
        placeholder="Enter task"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <input
        className="form-control"
        placeholder="Description"
        value={inputDescription}
        onChange={handleDescriptionChange}
        onKeyDown={handleKeyDown}
      />
      <select className="form-select" value={status} onChange={handleStatusChange}>
        <option value="Not started">Not started</option>
        <option value="In progress">In progress</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
      </select>
      <button className="btn btn-primary" onClick={handleAddButtonClick}>
        Add
      </button>
    </div>
  );
};

export default TodoForm;
