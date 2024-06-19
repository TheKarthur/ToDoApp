import React, { useState, useEffect } from "react";
import StatusSelect from "./StatusSelect";

interface TodoItem {
  id: string;
  text: string;
  description: string;
  status: 'Not started' | 'In progress' | 'Completed' | 'On Hold';
}

interface Props {
  todo: TodoItem;
  onClose: () => void;
  onChangeStatus: (id: string, status: 'Not started' | 'In progress' | 'Completed' | 'On Hold') => void;
}


const TodoDetailsModal: React.FC<Props> = ({ todo, onClose, onChangeStatus }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleStatusChange = (status: 'Not started' | 'In progress' | 'Completed' | 'On Hold') => {
    onChangeStatus(todo.id, status);
  };

  return (
    <>
      <div className={`modal fade ${isVisible ? "show" : ""}`} tabIndex={-1} role="dialog" style={{ display: isVisible ? "block" : "none" }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between">
              <h5 className="modal-title" id="todoModalLabel">{todo.text}</h5>
              <div className="d-flex align-items-center">
                <StatusSelect value={todo.status} onChange={handleStatusChange}/>
                <button type="button" className="ms-2 btn-close" aria-label="Close" onClick={handleClose}></button>
              </div>
            </div>
            <div className="modal-body">
              <p>{todo.description}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
      {isVisible && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default TodoDetailsModal;
