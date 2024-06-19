import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoColumn from "./TodoColumn";
import TodoDetailsModal from "./TodoDetailsModal";

interface Props {
  label: string;
}

export interface TodoItem {
  id: string;
  text: string;
  description: string;
  status: "Not started" | "In progress" | "Completed" | "On Hold";
}

const InputTodo: React.FC<Props> = ({ label }) => {
  const [listTodo, setListTodo] = useState<TodoItem[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  const generateId = (): string => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const handleAddTodo = (
    text: string,
    description: string,
    status: "Not started" | "In progress" | "Completed" | "On Hold"
  ) => {
    if (
      listTodo.some(
        (item) => item.text === text && item.description === description
      )
    ) {
      alert("The item is already in the list");
      return;
    }
    const newTodo: TodoItem = {
      id: generateId(),
      text,
      description,
      status,
    };
    setListTodo([...listTodo, newTodo]);
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

  const onChangeStatus = (id: string, status: 'Not started' | 'In progress' | 'Completed' | 'On Hold') => {
    // To implement a new sorting of the list when changing the status of a 'todo'.
    const updatedList = listTodo.map((item) => {
      if (item.id === id) {
        item.status = status;
      }
      return item;
    });
    setListTodo(updatedList);

  }

  const groupedTodos = listTodo.reduce((acc, item) => {
    acc[item.status] = acc[item.status] || [];
    acc[item.status].push(item);
    return acc;
  }, {} as Record<string, TodoItem[]>);

  return (
    <div className="container mb-3">
      <label className="form-label mt-3 text-center">{label}</label>
      <TodoForm onAddTodo={handleAddTodo} />
      <div className="d-flex justify-content-between overflow-auto">
        {["Not started", "In progress", "Completed", "On Hold"].map(
          (status) => (
            <TodoColumn
              key={status}
              status={
                status as
                  | "Not started"
                  | "In progress"
                  | "Completed"
                  | "On Hold"
              }
              todos={groupedTodos[status] || []}
              onItemDelete={handleItemDelete}
              onItemDoubleClick={handleTodoDoubleClick}
              onChangeStatus={onChangeStatus}
            />
          )
        )}
      </div>
      {selectedTodo && (
        <TodoDetailsModal todo={selectedTodo} onClose={handleCloseModal} onChangeStatus={onChangeStatus} />
      )}
    </div>
  );
};

export default InputTodo;
