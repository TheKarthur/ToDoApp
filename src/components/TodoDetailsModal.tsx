import React, { useState, useEffect } from "react";

interface TodoItem {
    id: string;
    text: string;
    description: string;
}

interface Props {
  todo: TodoItem;
  onClose: () => void;
}

const TodoDetailsModal: React.FC<Props> = ({ todo, onClose }) => {
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

  return (
    <>
      <div className={`modal fade ${isVisible ? "show" : ""}`} tabIndex={-1} role="dialog" style={{ display: isVisible ? "block" : "none" }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="todoModalLabel">{todo.text}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
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
