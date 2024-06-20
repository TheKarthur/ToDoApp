import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface TodoItem {
  id: string;
  text: string;
  description: string;
  status: "Not started" | "In progress" | "Completed" | "On Hold";
}

interface ListTodoItemProps {
  item: TodoItem;
  index: number;
  checked: boolean;
  onDelete: (id: string) => void;
  onDoubleClick: (item: TodoItem) => void;
  onCheckBoxClick: (id: string, isChecked: boolean) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

const ListTodoItem: React.FC<ListTodoItemProps> = ({
  item,
  index,
  checked,
  onDelete,
  onDoubleClick,
  onCheckBoxClick,
  moveItem,
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: "TODO_ITEM",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TODO_ITEM",
    item: { id: item.id, status: item.status, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  let count = 0;

  return (
    <li
      ref={ref}
      className="list-group-item w-auto"
      style={{
        minWidth: "150px",
        backgroundColor: isDragging ? "#f0f0f0" : "white",
        cursor: isDragging ? "move" : "default",
      }}
      onClick={() => count++}
      onDoubleClick={() => (count >= 2 ? onDoubleClick(item) : undefined)}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={checked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onCheckBoxClick(item.id, event.target.checked)
            }
            onClick={() => (count = 0)}
          />
          <span
            className={
              checked
                ? "me-2 text-decoration-line-through opacity-50 user-select-none text-break"
                : "me-2 user-select-none text-break"
            }
          >
            {item.text}
          </span>
        </div>
        <button className="btn btn-danger" onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default ListTodoItem;
