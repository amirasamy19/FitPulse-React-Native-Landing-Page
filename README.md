# FitPulse — React Native App

## Project structure

```
App.js                       Navigation root (Bottom Tab Navigator)
context/
  WorkoutsContext.js          Shared state (useState) for logged workouts
screens/
  HomeScreen.js               "Home" tab — the original landing page (ScrollView)
  AddWorkoutScreen.js         "Add Workout" tab — form (useState, TextInput)
  WorkoutsScreen.js           "Workouts" tab — useEffect, map(), FlatList, SectionList
```

## How to run it

1. Install [Node.js](https://nodejs.org) if you don't have it.
2. In this folder, install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo dev server:
   ```bash
   npm start
   ```
4. Scan the QR code with **Expo Go** on your phone, or press `a` / `i` / `w`
   in the terminal for Android / iOS / web.

If you're adding this to your existing project instead of using this folder
directly, copy `App.js`, the `context/` folder, and the `screens/` folder
into your project root, then run `npm install` to pull in the new
navigation dependencies listed in `package.json`.

## Requirements checklist

| Requirement | Where it's demonstrated |
|---|---|
| Continues previous project | `HomeScreen.js` is the original landing page, unchanged in content |
| `useState` | `AddWorkoutScreen.js` (form fields), `WorkoutsContext.js` (shared workouts list), `WorkoutsScreen.js` (`lastUpdated`) |
| `useEffect` | `WorkoutsScreen.js` — refreshes a "last updated" timestamp whenever the `workouts` list changes (dependency array: `[workouts]`) |
| Bottom Tab Navigation, 3+ tabs | `App.js` — `Home`, `Add Workout`, `Workouts` via `createBottomTabNavigator` |
| Form with 3+ inputs, `TextInput`, `useState`, Submit button | `AddWorkoutScreen.js` — Name, Duration, Notes |
| `ScrollView` | `HomeScreen.js` (full landing page) and `AddWorkoutScreen.js` (form) |
| `map()` | `WorkoutsScreen.js` — quick stats row |
| `FlatList` (data, renderItem, keyExtractor, 5+ items) | `WorkoutsScreen.js` — logged workouts (3 seed items + anything submitted via the form) |
| `SectionList` (sections, renderItem, renderSectionHeader) | `WorkoutsScreen.js` — workouts grouped into Strength / Cardio / Recovery |
| Styling | `StyleSheet.create()` in every screen |

## How the pieces connect

- Submitting the form on **Add Workout** calls `addWorkout()` from
  `WorkoutsContext`, which updates the shared `workouts` state.
- The **Workouts** tab reads that same state and renders it in a
  `FlatList`, so anything you submit shows up there immediately.
- The `useEffect` on the Workouts tab watches that same `workouts` array
  and updates a "last updated" timestamp any time it changes — a small,
  clear example of a side effect tied to a dependency array.
