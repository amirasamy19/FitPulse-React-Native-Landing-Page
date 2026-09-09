import React, { createContext, useState } from 'react';

// Shared app-wide state: workouts the user adds through the form on the
// "Add Workout" tab are stored here so the "Workouts" tab can display them
// in a FlatList. This is the single useState that both screens read from.
export const WorkoutsContext = createContext(null);

export function WorkoutsProvider({ children }) {
  const [workouts, setWorkouts] = useState([
    { id: 'seed-1', name: 'Morning Run', duration: '30', notes: '5k easy pace' },
    { id: 'seed-2', name: 'Upper Body Strength', duration: '45', notes: 'Push day' },
    { id: 'seed-3', name: 'Yoga Flow', duration: '20', notes: 'Recovery + mobility' },
  ]);

  const addWorkout = (workout) => {
    setWorkouts((prev) => [
      { ...workout, id: `w-${Date.now()}` },
      ...prev,
    ]);
  };

  return (
    <WorkoutsContext.Provider value={{ workouts, addWorkout }}>
      {children}
    </WorkoutsContext.Provider>
  );
}
