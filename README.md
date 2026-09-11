# FitPulse — React Native App

## Project structure

```
App.js                       Navigation root + ThemeProvider
api/
  api.js                     Axios instance (baseURL + timeout)
store/
  workoutsStore.js           Zustand store for workouts, persisted via AsyncStorage
context/
  ThemeContext.js            Shared state: light/dark theme (Context API)
components/
  Button.js                  Reusable button (variant + loading + disabled props)
  Card.js                    Reusable card wrapper (children prop)
  Input.js                   Reusable labeled text input (default placeholder)
  Loading.js                 Reusable loading indicator (default message)
screens/
  HomeScreen.js               "Home" tab — landing page + theme toggle
  AddWorkoutScreen.js         "Add Workout" tab — form + Axios POST + Zustand
  WorkoutsScreen.js           "Workouts" tab — Axios GET/PUT/DELETE, useEffect,
                               map(), FlatList, SectionList, Zustand
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
   in the terminal for Android / iOS / web (web needs the one-time
   `npx expo install react-native-web react-dom @expo/metro-runtime`).
5. To actually see persistence working, run the app as a real build or in
   Expo Go on a device/simulator — add a workout, fully close the app
   (swipe it away, don't just background it), reopen it, and it's still
   there. (The plain browser "web" preview clears storage on refresh less
   reliably than a native install, so prefer a phone/simulator to verify
   persistence.)

## Assignment 1 — Landing Page

Lives in `screens/HomeScreen.js` (the Home tab): `View`, `Text`, `Image`,
`ScrollView`, `Pressable`, `TouchableOpacity`, and `StyleSheet.create()`
covering `flexDirection`, `justifyContent`, `alignItems`, `padding`/
`margin`, `borderRadius`, `fontSize`/`fontWeight`, `backgroundColor`/`color`.

## Assignment 2 — Navigation, Hooks, Forms, Lists

| Requirement | Where |
|---|---|
| Bottom Tab Navigation, 3+ tabs | `App.js` — Home, Add Workout, Workouts |
| `useState` | Form fields in `AddWorkoutScreen.js` |
| `useEffect` (dependency array) | `WorkoutsScreen.js` — refreshes "last updated" whenever `workouts` changes |
| Form, 3+ `TextInput`s, Submit button | `AddWorkoutScreen.js` |
| `ScrollView` | `HomeScreen.js`, `AddWorkoutScreen.js` |
| `map()` | `WorkoutsScreen.js` — quick stats row |
| `FlatList` (data, renderItem, keyExtractor, 5+ items) | `WorkoutsScreen.js` — logged workouts |
| `SectionList` (sections, renderItem, renderSectionHeader) | `WorkoutsScreen.js` — categorized workouts |

## Assignment 3 — Axios, Reusable Components, Props, Context API

| Requirement | Where |
|---|---|
| `useEffect` for an API call | `WorkoutsScreen.js` — GET on mount (empty dependency array) |
| Axios GET | `WorkoutsScreen.js` — fetches suggested workouts from the API |
| Axios POST | `AddWorkoutScreen.js` — submits the new workout |
| Axios PUT | `WorkoutsScreen.js` — "Mark Complete" button on each workout |
| Axios DELETE | `WorkoutsScreen.js` — "Delete" button on each workout |
| `api.js` config (baseURL + timeout) | `api/api.js` |
| Reusable components | `components/Button.js`, `Card.js`, `Input.js`, `Loading.js` |
| Normal props | `label`/`onPress` (Button), `value`/`onChangeText` (Input) |
| Default props | `variant='primary'` (Button), `placeholder='Enter value'` (Input), `message='Loading...'` (Loading) |
| `children` prop | `Card.js` — wraps whatever is passed to it |
| Context API | `ThemeContext.js` — light/dark theme, toggled from the Home tab navbar |

## Assignment 4 — Zustand + AsyncStorage

The **workouts** feature (previously in `WorkoutsContext`, a Context API
store) was moved to Zustand for this assignment, since it already existed
and already had add/update/remove operations — exactly what the assignment
asks for.

| Requirement | Where |
|---|---|
| Install Zustand, separate store file | `store/workoutsStore.js` |
| Existing feature moved to Zustand | Workouts (previously Context, now Zustand) |
| Store actions: Add / Update / Remove / Clear | `addWorkout`, `toggleComplete`, `removeWorkout`, `clearWorkouts` in `workoutsStore.js` |
| Used across multiple screens | `AddWorkoutScreen.js` (`addWorkout`) and `WorkoutsScreen.js` (`workouts`, `toggleComplete`, `removeWorkout`, `clearWorkouts`) both read from the same store |
| AsyncStorage installed & connected | `@react-native-async-storage/async-storage` wired in via `createJSONStorage(() => AsyncStorage)` |
| `persist` middleware | `workoutsStore.js` wraps the store in Zustand's `persist()` |
| Data survives app restart | Add/complete/delete a workout, fully close the app, reopen — the list is unchanged |

`ThemeContext` was left on the Context API on purpose — the assignment asks
you to move *one* existing feature to Zustand, not replace Context
entirely, so this project now demonstrates both approaches side by side.

## Notes

- Axios is configured against [JSONPlaceholder](https://jsonplaceholder.typicode.com),
  a free fake REST API — a stand-in so the app has something real to call.
  Point `api/api.js`'s `baseURL` at your own backend when you have one.
- Tap the moon/sun icon in the Home tab's navbar to toggle light/dark theme.
- "Clear All" on the Workouts tab empties the store (and, thanks to
  `persist`, empties what's saved on disk too).
