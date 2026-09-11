import React from 'react';
import { View, StyleSheet } from 'react-native';

// Reusable Card. Doesn't know or care what's inside it — it just wraps
// whatever is passed as "children" with consistent card styling, so it can
// hold text, a form, a list item, anything.
export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
});
