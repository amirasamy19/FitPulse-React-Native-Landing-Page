import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
} from 'react-native';

import { ThemeContext } from '../context/ThemeContext';
import { useWorkoutsStore } from '../store/workoutsStore';
import api from '../api/api';

import Card from '../components/Card';
import Button from '../components/Button';
import Loading from '../components/Loading';

// Static "quick stats" summary rendered with map()
const quickStats = [
  { id: 'stat-1', label: 'This Week', value: '4 sessions' },
  { id: 'stat-2', label: 'Total Minutes', value: '182 min' },
  { id: 'stat-3', label: 'Streak', value: '6 days' },
];

// Static categorized data rendered with SectionList
const categorizedWorkouts = [
  { title: 'Strength', data: ['Push Day', 'Pull Day', 'Leg Day', 'Full Body Circuit'] },
  { title: 'Cardio', data: ['5k Run', 'Cycling Interval', 'Jump Rope'] },
  { title: 'Recovery', data: ['Yoga Flow', 'Stretch & Mobility'] },
];

// "Workouts" tab. Demonstrates:
// - useEffect with a dependency array (re-runs whenever the workouts list
//   from context changes)
// - a second useEffect that runs once on mount to GET data from an API
// - map() for the quick-stats row
// - FlatList for logged workouts, each row with PUT (mark complete) and
//   DELETE (remove) actions via Axios
// - SectionList for workouts grouped into categories
export default function WorkoutsScreen() {
  const workouts = useWorkoutsStore((state) => state.workouts);
  const toggleComplete = useWorkoutsStore((state) => state.toggleComplete);
  const removeWorkout = useWorkoutsStore((state) => state.removeWorkout);
  const clearWorkouts = useWorkoutsStore((state) => state.clearWorkouts);
  const { colors } = useContext(ThemeContext);

  const [lastUpdated, setLastUpdated] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [loadingSuggested, setLoadingSuggested] = useState(true);

  // Side effect #1: whenever the workouts list changes (a new one is
  // added, completed, or removed), refresh a "last updated" timestamp.
  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
  }, [workouts]);

  // Side effect #2: fetch a few "suggested workouts" from the API once,
  // when this screen first mounts (empty dependency array).
  useEffect(() => {
    let isMounted = true;

    const fetchSuggested = async () => {
      try {
        const response = await api.get('/todos', { params: { _limit: 5 } });
        if (isMounted) setSuggested(response.data);
      } catch (error) {
        console.log('GET /todos failed:', error.message);
      } finally {
        if (isMounted) setLoadingSuggested(false);
      }
    };

    fetchSuggested();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleComplete = async (item) => {
    try {
      // PUT the updated status to the API (fake endpoint / id for demo).
      await api.put('/todos/1', { completed: !item.completed });
    } catch (error) {
      console.log('PUT /todos/1 failed:', error.message);
    }
    toggleComplete(item.id);
  };

  const handleDelete = async (item) => {
    try {
      await api.delete('/todos/1');
    } catch (error) {
      console.log('DELETE /todos/1 failed:', error.message);
    }
    removeWorkout(item.id);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.title, { color: colors.text }]}>Your Workouts</Text>
          {workouts.length > 0 ? (
            <Button
              label="Clear All"
              variant="secondary"
              onPress={clearWorkouts}
              style={styles.clearButton}
            />
          ) : null}
        </View>
        {lastUpdated ? (
          <Text style={[styles.updatedText, { color: colors.subtext }]}>
            Last updated {lastUpdated}
          </Text>
        ) : null}
      </View>

      {/* ---------- map() section: quick stats ---------- */}
      <View style={styles.statsRow}>
        {quickStats.map((stat) => (
          <Card key={stat.id} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.subtext }]}>{stat.label}</Text>
          </Card>
        ))}
      </View>

      {/* ---------- FlatList section: logged workouts ---------- */}
      <Text style={[styles.sectionHeading, { color: colors.text }]}>Logged Sessions</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={[styles.workoutCard, { backgroundColor: colors.card }]}>
            <View style={styles.workoutCardTop}>
              <Text
                style={[
                  styles.workoutName,
                  { color: colors.text },
                  item.completed && styles.workoutNameDone,
                ]}
              >
                {item.completed ? '✅ ' : ''}
                {item.name}
              </Text>
              <Text style={styles.workoutDuration}>{item.duration} min</Text>
            </View>
            {item.notes ? (
              <Text style={[styles.workoutNotes, { color: colors.subtext }]}>{item.notes}</Text>
            ) : null}
            <View style={styles.workoutActions}>
              <Button
                label={item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                variant="secondary"
                onPress={() => handleToggleComplete(item)}
                style={styles.actionButton}
              />
              <Button
                label="Delete"
                variant="secondary"
                onPress={() => handleDelete(item)}
                style={[styles.actionButton, styles.deleteButton]}
              />
            </View>
          </Card>
        )}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />

      {/* ---------- Axios GET section: suggested workouts ---------- */}
      <Text style={[styles.sectionHeading, { color: colors.text }]}>Suggested (from API)</Text>
      {loadingSuggested ? (
        <Loading message="Fetching suggestions..." />
      ) : (
        <View style={styles.suggestedRow}>
          {suggested.slice(0, 3).map((item) => (
            <Text
              key={item.id}
              style={[styles.suggestedChip, { color: colors.subtext, borderColor: colors.border }]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
          ))}
        </View>
      )}

      {/* ---------- SectionList section: categorized workouts ---------- */}
      <Text style={[styles.sectionHeading, { color: colors.text }]}>Browse by Category</Text>
      <SectionList
        sections={categorizedWorkouts}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={[styles.categoryItem, { backgroundColor: colors.card }]}>
            <Text style={[styles.categoryItemText, { color: colors.text }]}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.categoryHeader}>{title}</Text>
        )}
        style={styles.sectionList}
        contentContainerStyle={styles.sectionListContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  updatedText: {
    fontSize: 11,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    paddingVertical: 14,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 8,
  },
  flatList: {
    maxHeight: 220,
  },
  flatListContent: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  workoutCard: {
    marginBottom: 10,
    padding: 14,
  },
  workoutCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutName: {
    fontSize: 14,
    fontWeight: '700',
  },
  workoutNameDone: {
    textDecorationLine: 'line-through',
  },
  workoutDuration: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '700',
  },
  workoutNotes: {
    fontSize: 12,
    marginTop: 4,
  },
  workoutActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  deleteButton: {
    borderColor: '#EF4444',
  },
  suggestedRow: {
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  suggestedChip: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  sectionList: {
    flex: 1,
  },
  sectionListContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  categoryHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#3B82F6',
    letterSpacing: 0.8,
    marginTop: 12,
    marginBottom: 6,
  },
  categoryItem: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 6,
  },
  categoryItemText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
