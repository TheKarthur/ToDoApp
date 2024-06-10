import React from "react";

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
  return (
    <div className="modal d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{todo.text}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>{todo.description}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailsModal;