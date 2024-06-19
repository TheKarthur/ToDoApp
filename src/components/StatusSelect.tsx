import React from "react";

interface StatusSelectProps {
  value: 'Not started' | 'In progress' | 'Completed' | 'On Hold';
  onChange: (value: 'Not started' | 'In progress' | 'Completed' | 'On Hold') => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as 'Not started' | 'In progress' | 'Completed' | 'On Hold');
  };

  return (
    <select className="form-select" value={value} onChange={handleChange}>
      <option value="Not started">Not started</option>
      <option value="In progress">In progress</option>
      <option value="Completed">Completed</option>
      <option value="On Hold">On Hold</option>
    </select>
  );
};

export default StatusSelect;
