import React from 'react';

interface DayProps {
  day: string;
  selected: boolean;
  onClick: () => void;
}

const Day: React.FC<DayProps> = ({ day, selected, onClick }) => {
  return (
    <div
      className={`day ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {day}
    </div>
  );
};

export default Day;
