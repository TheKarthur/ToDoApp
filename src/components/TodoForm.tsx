import React, { useState } from "react";
import StatusSelect from "./StatusSelect"; // Importe o novo componente

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

  const handleStatusChange = (value: 'Not started' | 'In progress' | 'Completed' | 'On Hold') => {
    setStatus(value);
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
      <StatusSelect value={status} onChange={handleStatusChange} />
      <button className="btn btn-primary" onClick={handleAddButtonClick}>
        Add
      </button>
    </div>
  );
};

export default TodoForm;
