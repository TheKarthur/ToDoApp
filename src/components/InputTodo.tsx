import React, { useState } from "react";
import ListTodo from "./ListTodo";
import TodoDetailsModal from "./TodoDetailsModal";

interface Props {
  label: string;
  placeholder: string;
}

interface TodoItem {
  id: string;
  text: string;
  description: string;
}

function InputTodo({ label, placeholder }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [listTodo, setListTodo] = useState<TodoItem[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  const generateId = (): string => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputDescription(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (inputValue.trim() !== "" && inputDescription.trim() !== "") {
      if (listTodo.some((item) => item.text === inputValue.trim())) {
        alert("The item is already in the list");
        return;
      }
      const newTodo: TodoItem = {
        id: generateId(),
        text: inputValue.trim(),
        description: inputDescription,
      };
      setListTodo([...listTodo, newTodo]);
      setInputValue("");
      setInputDescription("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddButtonClick();
    }
  };

  const handleItemDelete = (id: string) => {
    const updatedList = listTodo.filter((item) => item.id !== id);
    setListTodo(updatedList);
  };

  const handleTodoDoubleClick = (todo: TodoItem) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <div className="container mb-3">
      <label className="form-label mt-3 text-center">{label}</label>
      <div className="d-flex mb-3 gap-2">
        <input
          className="form-control"
          placeholder={placeholder}
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
        <button className="btn btn-primary" onClick={handleAddButtonClick}>
          Add
        </button>
      </div>
      <ListTodo
        list={listTodo}
        onItemDelete={handleItemDelete}
        onItemDoubleClick={handleTodoDoubleClick}
      ></ListTodo>
      {selectedTodo && (
        <TodoDetailsModal
          todo={selectedTodo}
          onClose={handleCloseModal}
        ></TodoDetailsModal>
      )}
    </div>
  );
}

export default InputTodo;
