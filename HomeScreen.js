import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// This is the landing page from the previous assignment, now living inside
// the "Home" tab. It demonstrates ScrollView with enough content to scroll
// (hero, stats, features, testimonial, CTA, footer).
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- NAVBAR ---------- */}
        <View style={styles.navbar}>
          <Text style={styles.logo}>FitPulse</Text>
          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <Text style={styles.navButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- HERO SECTION ---------- */}
        <View style={styles.hero}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>NEW · AI Coaching</Text>
            </View>
            <Text style={styles.heroTitle}>Train Smarter.{'\n'}Live Stronger.</Text>
            <Text style={styles.heroSubtitle}>
              Personalized workouts, real-time tracking, and a coach that
              actually gets you — all in one app.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>Get Started Free</Text>
            </Pressable>
          </View>
        </View>

        {/* ---------- STATS SECTION ---------- */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2M+</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.9★</Text>
            <Text style={styles.statLabel}>App Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>150+</Text>
            <Text style={styles.statLabel}>Workout Plans</Text>
          </View>
        </View>

        {/* ---------- FEATURES SECTION ---------- */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>WHY FITPULSE</Text>
          <Text style={styles.sectionTitle}>Everything you need to level up</Text>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconWrap, { backgroundColor: '#DBEAFE' }]}>
              <Text style={styles.featureIcon}>🎯</Text>
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>Personalized Plans</Text>
              <Text style={styles.featureDescription}>
                Workouts adapt automatically to your progress, goals, and
                available equipment.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Text style={styles.featureIcon}>📊</Text>
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>Live Progress Tracking</Text>
              <Text style={styles.featureDescription}>
                Visualize strength gains, streaks, and recovery with clean,
                simple charts.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconWrap, { backgroundColor: '#FCE7F3' }]}>
              <Text style={styles.featureIcon}>🤝</Text>
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>Community Challenges</Text>
              <Text style={styles.featureDescription}>
                Join thousands of members in weekly challenges and keep each
                other accountable.
              </Text>
            </View>
          </View>
        </View>

        {/* ---------- TESTIMONIAL SECTION ---------- */}
        <View style={styles.testimonialSection}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
            }}
            style={styles.testimonialAvatar}
          />
          <Text style={styles.testimonialQuote}>
            "FitPulse completely changed how I approach fitness. The
            coaching feels genuinely personal."
          </Text>
          <Text style={styles.testimonialName}>Maya Chen</Text>
          <Text style={styles.testimonialRole}>Member since 2023</Text>
        </View>

        {/* ---------- CALL TO ACTION SECTION ---------- */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to start your journey?</Text>
          <Text style={styles.ctaSubtitle}>
            Download FitPulse today and get your first month free.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.ctaButton,
              pressed && styles.ctaButtonPressed,
            ]}
          >
            <Text style={styles.ctaButtonText}>Download Now</Text>
          </Pressable>

          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.ctaSecondaryText}>Maybe later</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- FOOTER ---------- */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>FitPulse</Text>
          <Text style={styles.footerText}>
            © 2026 FitPulse Inc. All rights reserved.
          </Text>
          <View style={styles.footerLinksRow}>
            <Text style={styles.footerLink}>Privacy</Text>
            <Text style={styles.footerDot}>·</Text>
            <Text style={styles.footerLink}>Terms</Text>
            <Text style={styles.footerDot}>·</Text>
            <Text style={styles.footerLink}>Contact</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
  },

  /* Navbar */
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#0F172A',
  },
  logo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  /* Hero */
  hero: {
    minHeight: 480,
    backgroundColor: '#0F172A',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.55,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0F172A',
    opacity: 0.35,
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 48,
    alignItems: 'flex-start',
  },
  badge: {
    backgroundColor: 'rgba(96, 165, 250, 0.18)',
    borderWidth: 1,
    borderColor: '#60A5FA',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 18,
  },
  badgeText: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 44,
    marginBottom: 14,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#CBD5E1',
    lineHeight: 22,
    marginBottom: 28,
    maxWidth: 320,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryButtonPressed: {
    backgroundColor: '#2563EB',
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 20,
    paddingVertical: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E2E8F0',
  },

  /* Generic section */
  section: {
    paddingHorizontal: 24,
    paddingTop: 44,
    paddingBottom: 20,
  },
  sectionEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3B82F6',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 26,
    lineHeight: 30,
  },

  /* Feature cards */
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  featureIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  featureIcon: {
    fontSize: 22,
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
  },

  /* Testimonial */
  testimonialSection: {
    marginHorizontal: 24,
    marginTop: 20,
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
  },
  testimonialAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  testimonialQuote: {
    fontSize: 15,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 14,
  },
  testimonialName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  testimonialRole: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },

  /* CTA */
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 32,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 26,
  },
  ctaButton: {
    backgroundColor: '#0F172A',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
    width: '100%',
    marginBottom: 14,
  },
  ctaButtonPressed: {
    backgroundColor: '#1E293B',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  ctaSecondaryText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
  },

  /* Footer */
  footer: {
    alignItems: 'center',
    paddingVertical: 28,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerLogo: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 10,
  },
  footerLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLink: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  footerDot: {
    fontSize: 12,
    color: '#CBD5E1',
    marginHorizontal: 8,
  },
});
