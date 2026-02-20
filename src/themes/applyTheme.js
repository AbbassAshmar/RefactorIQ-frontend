/**
 * Apply theme variables to the document root
 * @param {Object} theme - Theme object containing CSS variable key-value pairs
 */
export function applyTheme(theme) {
  const root = document.documentElement;
  
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}
