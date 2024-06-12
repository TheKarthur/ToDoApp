import React from "react";
import ListTodo from "./ListTodo";
import { TodoItem } from "./InputTodo"; // Importar a interface do arquivo onde está definida

interface TodoColumnProps {
  status: 'Not started' | 'In progress' | 'Completed' | 'On Hold';
  todos: TodoItem[];
  onItemDelete: (id: string) => void;
  onItemDoubleClick: (item: TodoItem) => void;
}

const TodoColumn: React.FC<TodoColumnProps> = ({ status, todos, onItemDelete, onItemDoubleClick }) => {
  return (
    <div className="card w-25 m-2 shadow-sm">
      <div className="card-body">
        <h5 className="card-title user-select-none">{status}</h5>
        <ListTodo
          list={todos}
          onItemDelete={onItemDelete}
          onItemDoubleClick={onItemDoubleClick}
        />
      </div>
    </div>
  );
};

export default TodoColumn;