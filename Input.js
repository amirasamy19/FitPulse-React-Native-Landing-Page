import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

// Reusable labeled text input.
// - "value" and "onChangeText" are normal props (the caller controls state).
// - "placeholder", "multiline", and "keyboardType" all have default values.
export default function Input({
  label,
  value,
  onChangeText,
  placeholder = 'Enter value',
  multiline = false,
  keyboardType = 'default',
}) {
  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
});
