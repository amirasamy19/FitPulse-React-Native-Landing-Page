import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { WorkoutsProvider } from './context/WorkoutsContext';
import { ThemeProvider } from './context/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import AddWorkoutScreen from './screens/AddWorkoutScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';

const Tab = createBottomTabNavigator();

// Simple emoji-based tab icons so we don't need an extra icon dependency.
const TAB_ICONS = {
  Home: '🏠',
  'Add Workout': '➕',
  Workouts: '📋',
};

export default function App() {
  return (
    <ThemeProvider>
      <WorkoutsProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: '#3B82F6',
              tabBarInactiveTintColor: '#94A3B8',
              tabBarStyle: {
                backgroundColor: '#FFFFFF',
                borderTopColor: '#E2E8F0',
                height: 62,
                paddingBottom: 8,
                paddingTop: 6,
              },
              tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '700',
              },
              tabBarIcon: () => (
                <Text style={{ fontSize: 18 }}>{TAB_ICONS[route.name]}</Text>
              ),
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Add Workout" component={AddWorkoutScreen} />
            <Tab.Screen name="Workouts" component={WorkoutsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </WorkoutsProvider>
    </ThemeProvider>
  );
}
