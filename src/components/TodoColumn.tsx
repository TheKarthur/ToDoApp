import React from "react";
import { useDrop } from "react-dnd";
import ListTodo from "./ListTodo";
import { TodoItem } from "./InputTodo";

interface TodoColumnProps {
  status: 'Not started' | 'In progress' | 'Completed' | 'On Hold';
  todos: TodoItem[];
  onItemDelete: (id: string) => void;
  onItemDoubleClick: (item: TodoItem) => void;
  onChangeStatus: (id: string, status: 'Not started' | 'In progress' | 'Completed' | 'On Hold') => void;
  moveItem: (status: 'Not started' | 'In progress' | 'Completed' | 'On Hold', dragIndex: number, hoverIndex: number) => void;
}

const TodoColumn: React.FC<TodoColumnProps> = ({ status, todos, onItemDelete, onItemDoubleClick, onChangeStatus, moveItem }) => {
  const [, drop] = useDrop({
    accept: 'TODO_ITEM',
    drop: (item: { id: string, status: string }) => {
      if (item.status !== status) {
        onChangeStatus(item.id, status);
      }
    },
  });

  const moveItemWithinColumn = (dragIndex: number, hoverIndex: number) => {
    moveItem(status, dragIndex, hoverIndex);
  };

  return (
    <div ref={drop} className="card w-25 m-2 shadow-sm" style={{ minWidth: '200px' }}>
      <div className="card-body">
        <h5 className="card-title user-select-none">{status}</h5>
        <ListTodo
          list={todos}
          onItemDelete={onItemDelete}
          onItemDoubleClick={onItemDoubleClick}
          onChangeStatus={onChangeStatus}
          moveItem={moveItemWithinColumn}
        />
      </div>
    </div>
  );
};

export default TodoColumn;
