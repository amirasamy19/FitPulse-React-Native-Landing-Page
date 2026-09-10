# FitPulse — React Native App


## Project structure

```
App.js                       Wraps app in ThemeProvider + WorkoutsProvider, Bottom Tab Navigator
api/
  api.js                      Axios instance (baseURL + timeout)
context/
  WorkoutsContext.js          Shared workouts state, wired to Axios GET/POST/PUT/DELETE
  ThemeContext.js             Shared Light/Dark theme state
components/
  Button.js                    Reusable button (variants, default prop, children)
  Card.js                       Reusable container (children prop)
  Input.js                      Reusable labeled TextInput (default props)
  Loading.js                    Reusable loading indicator (default prop)
screens/
  HomeScreen.js                "Home" tab — landing page, reads ThemeContext
  AddWorkoutScreen.js          "Add Workout" tab — form built from Input/Button/Card
  WorkoutsScreen.js            "Workouts" tab — useEffect, map(), FlatList, SectionList
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
4. Scan the QR code with **Expo Go**, or press `a` / `i` / `w` for
   Android / iOS / web.

## New requirements checklist (this assignment)

| Requirement | Where it's demonstrated |
|---|---|
| `useEffect` | `WorkoutsContext.js` — fetches sample workouts from the API on mount; `WorkoutsScreen.js` — "last updated" timestamp effect |
| Axios (GET/POST/PUT/DELETE) | `WorkoutsContext.js` — `fetchWorkouts` (GET), `addWorkout` (POST), `toggleComplete` (PUT), `deleteWorkout` (DELETE), all through JSONPlaceholder as a demo API |
| `api.js` config | `api/api.js` — `axios.create({ baseURL, timeout })`, imported everywhere instead of calling axios directly |
| Reusable components | `components/Button.js`, `Card.js`, `Input.js`, `Loading.js` — used across Home, Add Workout, Workouts |
| Props | Normal props (`title`, `value`, `onPress`...), default props (`variant='primary'`, `placeholder=''`, `message='Loading...'`), children prop (`Card`, `Button`) |
| Context API | `WorkoutsContext.js` (shared workout data) **and** `ThemeContext.js` (Light/Dark mode, toggled from Home and Workouts tabs) |

## Carried over from previous assignments

| Requirement | Where it's demonstrated |
|---|---|
| Bottom Tab Navigation, 3+ tabs | `App.js` |
| Form with 3+ inputs + Submit | `AddWorkoutScreen.js` |
| `ScrollView` | `HomeScreen.js`, `AddWorkoutScreen.js` |
| `map()` | `WorkoutsScreen.js` — quick stats row |
| `FlatList` | `WorkoutsScreen.js` — logged workouts, now with Mark Done / Delete actions |
| `SectionList` | `WorkoutsScreen.js` — categorized workouts |

## Notes

- The API calls use `https://jsonplaceholder.typicode.com` (a free fake
  REST API) purely to demonstrate real Axios GET/POST/PUT/DELETE requests
  and loading/error state. Point `api/api.js`'s `baseURL` at your own
  backend when you have one — no other file needs to change.
- `toggleComplete` and `deleteWorkout` call `/posts/1` on the demo API
  since JSONPlaceholder only has 100 real records; swap in the real
  workout `id` once you have a matching backend.
