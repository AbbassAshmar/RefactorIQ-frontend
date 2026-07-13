/**
 * Resolves CSS variable references to their actual theme values.
 *
 * Chart.js does not resolve CSS variables when it receives a color string,
 * so chart colors must be resolved before they are passed to a chart.
 *
 * @param {Object} theme - The active theme object (LIGHT_THEME or DARK_THEME)
 * @param {string} cssVar - CSS variable reference, e.g. `var(--info-default)`
 * @returns {string} The resolved color value, or the original value when it cannot be resolved
 */
export function resolveThemeColor(theme, cssVar) {
    if (typeof cssVar !== 'string' || !cssVar.startsWith('var(--')) {
        return cssVar;
    }

    const variableName = cssVar.slice(6, -1);
    const value = theme?.[variableName];

    if (typeof value === 'string' && value.startsWith('var(--')) {
        return resolveThemeColor(theme, value);
    }

    return value || cssVar;
}

/**
 * Resolves an array of CSS variable references to their actual theme values.
 *
 * @param {Object} theme - The active theme object
 * @param {string[]} cssVars - CSS variable references or direct color values
 * @returns {string[]} The resolved color values
 */
export function resolveThemeColors(theme, cssVars) {
    return cssVars.map((cssVar) => resolveThemeColor(theme, cssVar));
}
