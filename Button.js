import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';

// Reusable Button.
// - "label" and "onPress" are normal props, required from the caller.
// - "variant", "disabled", and "loading" all have default values, so a
//   caller can just pass label + onPress and get a sensible-looking button.
export default function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}) {
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isPrimary ? '#FFFFFF' : '#3B82F6'}
        />
      ) : (
        <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textSecondary]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#3B82F6',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#3B82F6',
  },
});
