import React, { useState, useRef } from "react";
import StatusSelect from "./StatusSelect";

interface TodoFormProps {
  onAddTodo: (text: string, description: string, status: 'Not started' | 'In progress' | 'Completed' | 'On Hold') => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [status, setStatus] = useState<'Not started' | 'In progress' | 'Completed' | 'On Hold'>('Not started');
  const inputRef = useRef<HTMLInputElement>(null); // Ref para o input "Enter task"

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
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddButtonClick();
    }
  };

  const handleSelectKeyDown = (event: React.KeyboardEvent<HTMLSelectElement>) => {
    if (event.key === "Enter") {
      handleAddButtonClick();
    }
  };

  return (
    <div className="d-flex mb-3 gap-2">
      <input
        ref={inputRef}
        className="form-control"
        placeholder="Enter task"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <input
        className="form-control"
        placeholder="Description"
        value={inputDescription}
        onChange={handleDescriptionChange}
        onKeyDown={handleInputKeyDown}
      />
      <StatusSelect value={status} onChange={handleStatusChange} onKeyDown={handleSelectKeyDown}/>
      <button className="btn btn-primary" onClick={handleAddButtonClick}>
        Add
      </button>
    </div>
  );
};

export default TodoForm;
