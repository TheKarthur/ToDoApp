import React, { useState } from "react";

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
  onChangeStatus: (id: string) => void;
}

function ListTodo({ list, onItemDelete, onItemDoubleClick, onChangeStatus }: Props) {
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

  let count=0;

  const handleItemDoubleClick = (item: TodoItem) => {
    if(count>=2){
      onItemDoubleClick(item);
    }
  };

  const changeStatus = (id: string, status: 'Not started' | 'In progress' | 'Completed' | 'On Hold') => {
    onChangeStatus(id);
  }
  
  return (
    <ul className="list-group">
      {list.map((item) => (
        <li key={item.id} className="list-group-item w-auto" style={{ minWidth: '150px' }} onClick={() => count++} onDoubleClick={() => handleItemDoubleClick(item)}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={checkBoxValues[item.id]}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheckBoxClick(item.id, event.target.checked)
                }
                onClick={() => count=0}
              />
              <span
                className={
                  checkBoxValues[item.id]
                    ? "me-2 text-decoration-line-through opacity-50 user-select-none text-break"
                    : "me-2 user-select-none text-break"
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
            {/* <button
              className="btn btn-primary"
              onClick={() => changeStatus(item.id, item.status)}
            ></button> */}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListTodo;
