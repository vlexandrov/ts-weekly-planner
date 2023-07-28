import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import Day from './Day';
import './WeeklyPlanner.css'; // Import the CSS file

interface Task {
  id: number;
  description: string;
  day: string;
}

const WeeklyPlanner: React.FC = () => {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedDay, setSelectedDay] = useState<string>(format(today, 'EEEE'));
  const [showForm, setShowForm] = useState(false);

  const handleTaskDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(event.target.value);
  };

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      description: taskDescription,
      day: selectedDay,
    };

    setTasks([...tasks, newTask]);
    setTaskDescription('');
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="weekly-planner">
      <h2>Weekly Planner</h2>
      <div className="days-container">
        {days.map((day) => (
          <Day
            key={format(day, 'yyyy-MM-dd')}
            day={format(day, 'EEEE')}
            selected={format(day, 'EEEE') === selectedDay}
            onClick={() => handleDayClick(format(day, 'EEEE'))}
          />
        ))}
      </div>
      {showForm ? (
        <div>
          <h3>Create Task:</h3>
          <input type="text" value={taskDescription} onChange={handleTaskDescriptionChange} />
          <button className="add-task-button" onClick={handleAddTask}>
            Add Task
          </button>
          <button className="cancel-button" onClick={toggleForm}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="add-task-button" onClick={toggleForm}>
          Add Task
        </button>
      )}
      <div className="tasks-section">
        <h3>Tasks:</h3>
        <div className="day-tasks">
            {days.map((day) => {
            const tasksForDay = tasks.filter((task) => task.day === format(day, 'EEEE'));

            return (
                <div key={format(day, 'yyyy-MM-dd')}>
                <h4>{format(day, 'EEEE')}</h4>
                <ul>
                    {tasksForDay.map((task) => (
                    <li key={task.id}>{task.description}</li>
                    ))}
                </ul>
                </div>
            );
            })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner;
