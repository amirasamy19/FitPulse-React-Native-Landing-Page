import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { WorkoutsContext } from '../context/WorkoutsContext';

// "Add Workout" tab. Demonstrates:
// - useState for each form field
// - TextInput for user entry (3 inputs: name, duration, notes)
// - a Submit button that saves the entry into shared context state,
//   which the "Workouts" tab then displays in a FlatList
export default function AddWorkoutScreen() {
  const { addWorkout } = useContext(WorkoutsContext);

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !duration.trim()) {
      setConfirmation('Please fill in at least a name and duration.');
      return;
    }

    addWorkout({ name: name.trim(), duration: duration.trim(), notes: notes.trim() });

    setConfirmation(`"${name.trim()}" was added to your Workouts tab ✅`);
    setName('');
    setDuration('');
    setNotes('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Log a Workout</Text>
        <Text style={styles.subtitle}>
          Fill in the details below and add it to your workout list.
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Workout Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Leg Day"
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Duration (minutes)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 45"
            placeholderTextColor="#94A3B8"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g. Focused on squats and lunges"
            placeholderTextColor="#94A3B8"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
          />

          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </Pressable>

          {confirmation ? (
            <Text style={styles.confirmation}>{confirmation}</Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 24,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
    marginTop: 14,
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
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonPressed: {
    backgroundColor: '#2563EB',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  confirmation: {
    marginTop: 14,
    fontSize: 13,
    color: '#16A34A',
    fontWeight: '600',
    textAlign: 'center',
  },
});
