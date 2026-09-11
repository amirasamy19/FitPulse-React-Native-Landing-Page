import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Reusable loading indicator, shown while Axios requests are in flight.
// "message" has a default value so callers can use <Loading /> as-is, or
// override it with something like <Loading message="Fetching workouts..." />
export default function Loading({ message = 'Loading...' }) {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="small" color="#3B82F6" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 8,
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
});
