import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoColumn from "./TodoColumn";
import TodoDetailsModal from "./TodoDetailsModal";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface TodoItem {
  id: string;
  text: string;
  description: string;
  status: "Not started" | "In progress" | "Completed" | "On Hold";
}

const TodoApp: React.FC = () => {
  const [listTodo, setListTodo] = useState<TodoItem[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  const generateId = (): string => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const handleAddTodo = (text: string, description: string, status: "Not started" | "In progress" | "Completed" | "On Hold") => {
    if (listTodo.some(item => item.text === text && item.description === description)) {
      alert("The item is already in the list");
      return;
    }
    const newTodo: TodoItem = { id: generateId(), text, description, status };
    setListTodo([...listTodo, newTodo]);
  };

  const handleItemDelete = (id: string) => {
    const updatedList = listTodo.filter(item => item.id !== id);
    setListTodo(updatedList);
  };

  const handleTodoDoubleClick = (todo: TodoItem) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const onChangeStatus = (id: string, status: 'Not started' | 'In progress' | 'Completed' | 'On Hold') => {
    const updatedList = listTodo.map(item => item.id === id ? { ...item, status } : item);
    setListTodo(updatedList);
  };

  const moveItem = (status: 'Not started' | 'In progress' | 'Completed' | 'On Hold', dragIndex: number, hoverIndex: number) => {
    const items = listTodo.filter(item => item.status === status);
    const [draggedItem] = items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, draggedItem);
    const updatedList = listTodo.filter(item => item.status !== status).concat(items);
    setListTodo(updatedList);
  };

  const groupedTodos = listTodo.reduce((acc, item) => {
    acc[item.status] = acc[item.status] || [];
    acc[item.status].push(item);
    return acc;
  }, {} as Record<string, TodoItem[]>);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mb-3">
        <label className="form-label mt-3 text-center">Todo List</label>
        <TodoForm onAddTodo={handleAddTodo} />
        <div className="d-flex justify-content-between overflow-auto">
          {["Not started", "In progress", "Completed", "On Hold"].map(status => (
            <TodoColumn
              key={status}
              status={status as "Not started" | "In progress" | "Completed" | "On Hold"}
              todos={groupedTodos[status] || []}
              onItemDelete={handleItemDelete}
              onItemDoubleClick={handleTodoDoubleClick}
              onChangeStatus={onChangeStatus}
              moveItem={moveItem}
            />
          ))}
        </div>
        {selectedTodo && (
          <TodoDetailsModal todo={selectedTodo} onClose={handleCloseModal} onChangeStatus={onChangeStatus} />
        )}
      </div>
    </DndProvider>
  );
};

export default TodoApp;
