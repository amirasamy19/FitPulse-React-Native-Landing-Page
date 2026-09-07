# FitPulse — React Native Landing Page

A landing page for a fictional fitness app, built with React Native to satisfy
the Landing Page assignment brief.

## How to run it

1. Install [Node.js](https://nodejs.org) if you don't have it.
2. In this folder, install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo dev server:
   ```bash
   npm start
   ```
4. Scan the QR code with the **Expo Go** app on your phone (iOS/Android), or
   press `i` / `a` in the terminal to launch an iOS/Android simulator, or
   press `w` for a web preview.

If you'd rather drop this into an existing Expo/React Native project instead
of using this one, just copy `App.js` into your project root.

## Sections included

- **Navbar** — logo + sign-in button
- **Hero** — background image, headline, subheadline, primary CTA button
- **Stats strip** — floating card with key numbers
- **Features** — three feature cards with icon, title, description
- **Testimonial** — quote card with avatar
- **Call to action** — secondary conversion section with two buttons
- **Footer** — legal links

## Requirements checklist

| Requirement | Where it's demonstrated |
|---|---|
| `View`, `Text`, `Image`, `ScrollView`, `Pressable`, `TouchableOpacity` | Used throughout — no HTML elements (`div`, `p`, `button`, `img`) |
| `StyleSheet.create()` | All styling lives in the single `styles` object at the bottom of `App.js` |
| `flexDirection` | `navbar`, `statsRow`, `featureCard`, `footerLinksRow` |
| `justifyContent` | `navbar`, `statsRow` |
| `alignItems` | `hero`, `ctaSection`, `testimonialSection`, `footer` |
| `padding` / `margin` | Used across nearly every style block |
| `borderRadius` | Buttons, cards, badges, avatar |
| `fontSize` / `fontWeight` | All text styles |
| `backgroundColor` / `color` | All components |
| Interactive elements | `Pressable` (hero + CTA buttons, with pressed-state styling) and `TouchableOpacity` (nav sign-in, secondary CTA) |
| Images | Hero background photo, testimonial avatar (remote URLs via `Image`) |

## Notes

- Images are loaded from remote URLs (Unsplash) via `Image source={{ uri }}`.
  Swap these for local assets with `require('./assets/...')` if you'd rather
  bundle images offline.
- Colors, spacing, and type scale are kept in a consistent dark-navy /
  electric-blue palette to give the page a cohesive, "real app" feel.
- Feel free to rename "FitPulse" and swap section copy/images for a different
  app concept — the structure (nav → hero → stats → features → testimonial →
  CTA → footer) will still hold up.
