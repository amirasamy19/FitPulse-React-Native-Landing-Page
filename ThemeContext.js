import React, { createContext, useState } from 'react';

const LIGHT_COLORS = {
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  subtext: '#64748B',
  border: '#E2E8F0',
};

const DARK_COLORS = {
  background: '#0F172A',
  card: '#1E293B',
  text: '#F8FAFC',
  subtext: '#94A3B8',
  border: '#334155',
};

// Second Context API example (the first is WorkoutsContext). This one
// shares a simple app-wide setting — light/dark theme — the way you might
// share user info, auth state, or language across screens.
export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const colors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
