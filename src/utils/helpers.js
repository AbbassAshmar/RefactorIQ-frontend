/**
 * Generic utility helpers.
 * Add project-wide pure functions here (formatting, validation, etc.).
 */

/**
 * Combine class names, filtering out falsy values.
 * Lightweight alternative to the `clsx` package.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
