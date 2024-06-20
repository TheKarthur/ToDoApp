import React, { useState } from "react";
import ListTodoItem from "./ListTodoItem";

interface TodoItem {
  id: string;
  text: string;
  description: string;
  status: 'Not started' | 'In progress' | 'Completed' | 'On Hold';
}

interface Props {
  list: TodoItem[];
  onItemDelete: (id: string) => void;
  onItemDoubleClick: (item: TodoItem) => void;
  onChangeStatus: (id: string, status: 'Not started' | 'In progress' | 'Completed' | 'On Hold') => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

function ListTodo({ list, onItemDelete, onItemDoubleClick, onChangeStatus, moveItem }: Props) {
  const initialCheckBoxValues = list.reduce((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {} as Record<string, boolean>);

  const [checkBoxValues, setCheckBoxValues] = useState<Record<string, boolean>>(initialCheckBoxValues);

  const handleCheckBoxClick = (id: string, isChecked: boolean) => {
    setCheckBoxValues((prevValues) => ({
      ...prevValues,
      [id]: isChecked,
    }));
  };

  return (
    <ul className="list-group">
      {list.map((item, index) => (
        <ListTodoItem
          key={item.id}
          item={item}
          index={index}
          checked={checkBoxValues[item.id]}
          onDelete={onItemDelete}
          onDoubleClick={onItemDoubleClick}
          onCheckBoxClick={handleCheckBoxClick}
          moveItem={moveItem}
        />
      ))}
    </ul>
  );
}

export default ListTodo;
