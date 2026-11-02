import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// New key on purpose: the previous site saved 'theme' = 'light' for every visitor automatically,
// so the old value is not a real preference. Only an explicit toggle is stored here.
const STORAGE_KEY = 'portfolio-theme';

const ThemeContext = createContext({ theme: 'dark', setTheme: () => {} });

const readStoredTheme = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
};

export const ThemeProvider = ({ children }) => {
  // Dark is the default; only a theme the visitor chose themselves overrides it.
  const [theme, setThemeState] = useState(() => readStoredTheme() || 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#060509' : '#f7f6fb');
  }, [theme]);

  const setTheme = useCallback((next) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
