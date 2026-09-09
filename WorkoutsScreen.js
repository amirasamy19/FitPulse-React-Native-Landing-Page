import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
} from 'react-native';
import { WorkoutsContext } from '../context/WorkoutsContext';

// Static "quick stats" summary rendered with map()
const quickStats = [
  { id: 'stat-1', label: 'This Week', value: '4 sessions' },
  { id: 'stat-2', label: 'Total Minutes', value: '182 min' },
  { id: 'stat-3', label: 'Streak', value: '6 days' },
];

// Static categorized data rendered with SectionList
const categorizedWorkouts = [
  {
    title: 'Strength',
    data: ['Push Day', 'Pull Day', 'Leg Day', 'Full Body Circuit'],
  },
  {
    title: 'Cardio',
    data: ['5k Run', 'Cycling Interval', 'Jump Rope'],
  },
  {
    title: 'Recovery',
    data: ['Yoga Flow', 'Stretch & Mobility'],
  },
];

// "Workouts" tab. Demonstrates:
// - useEffect with a dependency array (re-runs whenever the workouts list
//   from context changes, e.g. after a new submission on the Add tab)
// - map() for the quick-stats row
// - FlatList for the user's logged workouts (from context, 5+ with seed data)
// - SectionList for workouts grouped into categories
export default function WorkoutsScreen() {
  const { workouts } = useContext(WorkoutsContext);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // Side effect: whenever the workouts list changes (a new one is added,
    // or the screen first mounts), refresh a "last updated" timestamp.
    setLastUpdated(new Date().toLocaleTimeString());
  }, [workouts]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Workouts</Text>
        {lastUpdated ? (
          <Text style={styles.updatedText}>Last updated {lastUpdated}</Text>
        ) : null}
      </View>

      {/* ---------- map() section: quick stats ---------- */}
      <View style={styles.statsRow}>
        {quickStats.map((stat) => (
          <View key={stat.id} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* ---------- FlatList section: logged workouts ---------- */}
      <Text style={styles.sectionHeading}>Logged Sessions</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.workoutCard}>
            <View style={styles.workoutCardTop}>
              <Text style={styles.workoutName}>{item.name}</Text>
              <Text style={styles.workoutDuration}>{item.duration} min</Text>
            </View>
            {item.notes ? (
              <Text style={styles.workoutNotes}>{item.notes}</Text>
            ) : null}
          </View>
        )}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />

      {/* ---------- SectionList section: categorized workouts ---------- */}
      <Text style={styles.sectionHeading}>Browse by Category</Text>
      <SectionList
        sections={categorizedWorkouts}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryItemText}>{item}</Text>
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
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  updatedText: {
    fontSize: 11,
    color: '#94A3B8',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 8,
  },
  flatList: {
    maxHeight: 160,
  },
  flatListContent: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  workoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  workoutCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  workoutDuration: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '700',
  },
  workoutNotes: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 6,
  },
  categoryItemText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
  },
});
