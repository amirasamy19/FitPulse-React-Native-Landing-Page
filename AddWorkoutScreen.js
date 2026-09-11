import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';

import { ThemeContext } from '../context/ThemeContext';
import { useWorkoutsStore } from '../store/workoutsStore';
import api from '../api/api';

import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

// "Add Workout" tab. Demonstrates:
// - useState for each form field
// - reusable Input / Button / Card components (props + default props)
// - an Axios POST request (via the shared api.js instance) when the form
//   is submitted, before saving into the Zustand workouts store
export default function AddWorkoutScreen() {
  const addWorkout = useWorkoutsStore((state) => state.addWorkout);
  const { colors } = useContext(ThemeContext);

  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !duration.trim()) {
      setConfirmation('Please fill in at least a name and duration.');
      return;
    }

    setSubmitting(true);
    setConfirmation('');

    try {
      // POST the workout to the API (JSONPlaceholder echoes it back with a
      // fake id — a stand-in for a real "save workout" endpoint).
      await api.post('/posts', {
        title: name.trim(),
        body: notes.trim(),
        duration: duration.trim(),
      });
    } catch (error) {
      console.log('POST /posts failed:', error.message);
    }

    addWorkout({ name: name.trim(), duration: duration.trim(), notes: notes.trim() });

    setSubmitting(false);
    setConfirmation(`"${name.trim()}" was added to your Workouts tab ✅`);
    setName('');
    setDuration('');
    setNotes('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: colors.text }]}>Log a Workout</Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          Fill in the details below and add it to your workout list.
        </Text>

        <Card style={{ backgroundColor: colors.card }}>
          <Input label="Workout Name" value={name} onChangeText={setName} placeholder="e.g. Leg Day" />
          <Input
            label="Duration (minutes)"
            value={duration}
            onChangeText={setDuration}
            placeholder="e.g. 45"
            keyboardType="numeric"
          />
          <Input
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            placeholder="e.g. Focused on squats and lunges"
            multiline
          />

          <View style={styles.buttonWrap}>
            <Button label="Submit" onPress={handleSubmit} loading={submitting} />
          </View>

          {confirmation ? (
            <Text style={styles.confirmation}>{confirmation}</Text>
          ) : null}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonWrap: {
    marginTop: 24,
  },
  confirmation: {
    marginTop: 14,
    fontSize: 13,
    color: '#16A34A',
    fontWeight: '600',
    textAlign: 'center',
  },
});
