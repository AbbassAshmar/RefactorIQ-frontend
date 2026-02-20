import { createContext, useContext, useState, useEffect } from 'react';
import { applyTheme } from '@/themes/applyTheme';
import { DARK_THEME } from '@/themes/dark';
import { LIGHT_THEME } from '@/themes/light';

const ThemeContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
  themeColors: DARK_THEME,
});

export default function ThemeProvider({ children }) {
  // Check user's system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Initialize theme mode (could also load from localStorage)
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return savedMode || (prefersDark ? 'dark' : 'light');
  });

  // Get current theme colors based on mode
  const themeColors = mode === 'dark' ? DARK_THEME : LIGHT_THEME;

  // Apply theme whenever mode changes
  useEffect(() => {
    applyTheme(themeColors);
    localStorage.setItem('theme-mode', mode);
  }, [mode, themeColors]);

  const toggleTheme = () => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newMode) => {
    if (newMode === 'dark' || newMode === 'light') {
      setMode(newMode);
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
