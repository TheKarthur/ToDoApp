import React, { useState } from "react";

interface TodoItem {
  id: string;
  text: string;
  description: string; // Adicionando a descrição opcional à interface do TodoItem
}

interface Props {
  list: TodoItem[];
  onItemDelete: (id: string) => void;
  onItemDoubleClick: (item: TodoItem) => void; // Adicionando um callback para lidar com o clique duplo
}

function ListTodo({ list, onItemDelete, onItemDoubleClick }: Props) {
  const initialCheckBoxValues = list.reduce((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {} as Record<string, boolean>);

  const [checkBoxValues, setCheckBoxValues] = useState<Record<string, boolean>>(
    initialCheckBoxValues
  );

  const handleDeleteClick = (id: string) => {
    onItemDelete(id);
  };

  const handleCheckBoxClick = (id: string, isChecked: boolean) => {
    setCheckBoxValues((prevValues) => ({
      ...prevValues,
      [id]: isChecked,
    }));
  };

  const handleItemDoubleClick = (item: TodoItem) => {
    onItemDoubleClick(item);
  };

  return (
    <ul className="list-group">
      {list.map((item) => (
        <li key={item.id} className="list-group-item" onDoubleClick={() => handleItemDoubleClick(item)}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <input
                type="checkbox"
                className="form-check-input"
                checked={checkBoxValues[item.id]}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheckBoxClick(item.id, event.target.checked)
                }
              />
              <span
                className={
                  checkBoxValues[item.id]
                    ? "ms-2 text-decoration-line-through opacity-50"
                    : "ms-2"
                }
              >
                {item.text}
              </span>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteClick(item.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListTodo;
