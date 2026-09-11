import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Workouts used to live in WorkoutsContext (Context API). For this
// assignment that state management moves to Zustand, and is now persisted
// to disk with AsyncStorage via the `persist` middleware — so anything
// added, completed, or removed is still there after the app is fully
// closed and reopened.
export const useWorkoutsStore = create(
  persist(
    (set) => ({
      workouts: [
        { id: 'seed-1', name: 'Morning Run', duration: '30', notes: '5k easy pace', completed: false },
        { id: 'seed-2', name: 'Upper Body Strength', duration: '45', notes: 'Push day', completed: false },
        { id: 'seed-3', name: 'Yoga Flow', duration: '20', notes: 'Recovery + mobility', completed: true },
      ],

      // Add
      addWorkout: (workout) =>
        set((state) => ({
          workouts: [
            { ...workout, id: `w-${Date.now()}`, completed: false },
            ...state.workouts,
          ],
        })),

      // Update (toggle complete status)
      toggleComplete: (id) =>
        set((state) => ({
          workouts: state.workouts.map((w) =>
            w.id === id ? { ...w, completed: !w.completed } : w
          ),
        })),

      // Remove
      removeWorkout: (id) =>
        set((state) => ({
          workouts: state.workouts.filter((w) => w.id !== id),
        })),

      // Clear
      clearWorkouts: () => set({ workouts: [] }),
    }),
    {
      name: 'fitpulse-workouts-storage', // AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
