/**
 * DARK THEME
 * Two-tier color system:
 * 1. Base colors (HSL values) - not used directly in components
 * 2. Semantic colors (references to base colors) - used in components
 */

export const DARK_THEME = {
  // ============================================
  // BASE COLORS - GRAYSCALE RAMP
  // ============================================
  'gray-50': 'hsl(220, 5%, 98%)',
  'gray-100': 'hsl(220, 5%, 91%)',
  'gray-200': 'hsl(220, 5%, 86%)',
  'gray-300': 'hsl(220, 5%, 80%)',
  'gray-400': 'hsl(220, 5%, 65%)',
  'gray-500': 'hsl(220, 5%, 50%)',
  'gray-600': 'hsl(220, 5%, 40%)',
  'gray-700': 'hsl(220, 5%, 30%)',
  'gray-800': 'hsl(220, 5%, 20%)',
  'gray-850': 'hsl(220, 5%, 15%)',
  'gray-900': 'hsl(220, 5%, 10%)',
  'gray-950': 'hsl(220, 5%, 5%)',

  // ============================================
  // BASE COLORS - BRAND (BLUE)
  // ============================================
  'blue-50': 'hsl(201, 80%, 95%)',
  'blue-100': 'hsl(201, 80%, 85%)',
  'blue-200': 'hsl(201, 80%, 75%)',
  'blue-300': 'hsl(201, 80%, 65%)',
  'blue-400': 'hsl(201, 80%, 50%)',
  'blue-500': 'hsl(201, 80%, 32%)', // Brand color #106491
  'blue-600': 'hsl(201, 80%, 28%)',
  'blue-700': 'hsl(201, 80%, 24%)',
  'blue-800': 'hsl(201, 80%, 20%)',
  'blue-900': 'hsl(201, 80%, 16%)',

  // ============================================
  // BASE COLORS - ACCENT COLORS
  // ============================================
  // Yellow Scale
  'yellow-50': 'hsl(54, 78%, 95%)',
  'yellow-100': 'hsl(54, 78%, 85%)',
  'yellow-200': 'hsl(54, 78%, 75%)',
  'yellow-300': 'hsl(54, 78%, 65%)',
  'yellow-500': 'hsl(54, 78%, 55%)',
  'yellow-600': 'hsl(54, 78%, 45%)',
  'yellow-700': 'hsl(54, 78%, 35%)',

  // Mauve Scale
  'mauve-50': 'hsl(266, 53%, 95%)',
  'mauve-100': 'hsl(266, 53%, 85%)',
  'mauve-200': 'hsl(266, 53%, 75%)',
  'mauve-300': 'hsl(266, 53%, 65%)',
  'mauve-500': 'hsl(266, 53%, 53%)',
  'mauve-600': 'hsl(266, 53%, 43%)',
  'mauve-700': 'hsl(266, 53%, 33%)',

  // Rose Scale
  'rose-50': 'hsl(332, 54%, 95%)',
  'rose-100': 'hsl(332, 54%, 85%)',
  'rose-300': 'hsl(332, 54%, 65%)',
  'rose-500': 'hsl(332, 54%, 43%)',
  'rose-600': 'hsl(332, 54%, 38%)',
  'rose-700': 'hsl(332, 54%, 33%)',

  // Amber Scale
  'amber-500': 'hsl(38, 100%, 50%)',
  'amber-600': 'hsl(38, 92%, 65%)',
  'amber-700': 'hsl(38, 92%, 75%)',
  'amber-800': 'hsl(38, 92%, 85%)',

  // Coral Scale
  'coral-500': 'hsl(25, 82%, 68%)',
  'coral-600': 'hsl(25, 82%, 56%)',

  // Green Scale (for success states)
  'green-50': 'hsl(142, 76%, 95%)',
  'green-100': 'hsl(142, 76%, 85%)',
  'green-500': 'hsl(142, 76%, 36%)',
  'green-600': 'hsl(142, 76%, 32%)',
  'green-700': 'hsl(142, 76%, 28%)',

  // Red Scale (for error states)
  'red-50': 'hsl(0, 84%, 95%)',
  'red-100': 'hsl(0, 84%, 85%)',
  'red-500': 'hsl(0, 84%, 60%)',
  'red-600': 'hsl(0, 84%, 50%)',
  'red-700': 'hsl(0, 84%, 40%)',

  // Orange Scale (for warning states)
  'orange-50': 'hsl(33, 100%, 95%)',
  'orange-100': 'hsl(33, 100%, 85%)',
  'orange-500': 'hsl(33, 100%, 50%)',
  'orange-600': 'hsl(33, 100%, 45%)',
  'orange-700': 'hsl(33, 100%, 40%)',

  // ============================================
  // SEMANTIC COLORS - TEXT
  // ============================================
  'text-primary': 'var(--gray-50)',
  'text-secondary': 'var(--gray-300)',
  'text-tertiary': 'var(--gray-400)',
  'text-disabled': 'var(--gray-600)',
  'text-inverse': 'var(--gray-900)',
  'text-brand': 'var(--blue-400)',
  'text-link': 'var(--blue-400)',
  'text-link-hover': 'var(--blue-300)',

  // ============================================
  // SEMANTIC COLORS - BACKGROUNDS (Consolidated)
  // ============================================
  // Layout Layers
  'background-primary': 'var(--gray-950)',    // Base App Background
  'background-secondary': 'var(--gray-900)',  // Main Surfaces (Cards, Panels)
  'background-tertiary': 'var(--gray-850)',   // Nested Surfaces
  'background-quaternary': 'var(--gray-800)', // Deep nesting or subtle accents
  
  // Overlays & Special
  'background-elevated': 'var(--gray-850)',   // for Modals/Popovers
  'background-overlay': 'hsla(220, 5%, 5%, 0.80)',
  'background-inverse': 'var(--gray-50)',
  
  // Interactive States (applied on top of backgrounds)
  'background-hover': 'hsla(220, 5%, 98%, 0.05)',
  'background-pressed': 'hsla(220, 5%, 98%, 0.10)',
  'background-selected': 'hsla(201, 80%, 32%, 0.16)',


  // ============================================
  // SEMANTIC COLORS - BORDERS
  // ============================================
  'border-default': 'var(--gray-800)',
  'border-secondary': 'var(--gray-700)',
  'border-tertiary': 'hsla(220, 5%, 98%, 0.08)',
  'border-focus': 'var(--blue-500)',
  'border-brand': 'var(--blue-500)',

  // ============================================
  // SEMANTIC COLORS - BRAND / PRIMARY ACTIONS
  // ============================================
  'brand-primary': 'var(--blue-500)',
  'brand-primary-hover': 'var(--blue-400)',
  'brand-primary-pressed': 'var(--blue-600)',
  'brand-primary-bg': 'hsla(201, 80%, 32%, 0.16)',
  'brand-secondary': 'var(--blue-700)',
  'brand-text': 'var(--blue-400)',

  // ============================================
  // SEMANTIC COLORS - STATE COLORS
  // ============================================
  // Success
  'success-default': 'var(--green-500)',
  'success-hover': 'var(--green-600)',
  'success-text': 'var(--green-100)',
  'success-bg': 'hsla(142, 76%, 36%, 0.16)',
  'success-border': 'var(--green-700)',

  // Error
  'error-default': 'var(--red-500)',
  'error-hover': 'var(--red-600)',
  'error-text': 'var(--red-100)',
  'error-bg': 'hsla(0, 84%, 60%, 0.16)',
  'error-border': 'var(--red-700)',

  // Warning
  'warning-default': 'var(--orange-500)',
  'warning-hover': 'var(--orange-600)',
  'warning-text': 'var(--orange-100)',
  'warning-bg': 'hsla(33, 100%, 50%, 0.16)',
  'warning-border': 'var(--orange-700)',

  // Info
  'info-default': 'var(--blue-400)',
  'info-hover': 'var(--blue-300)',
  'info-text': 'var(--blue-100)',
  'info-bg': 'hsla(201, 80%, 50%, 0.16)',
  'info-border': 'var(--blue-700)',

  // ============================================
  // SEMANTIC COLORS - ACCENT BACKGROUNDS
  // ============================================
  'accent-yellow': 'var(--yellow-500)',
  'accent-yellow-bg': 'hsla(54, 78%, 55%, 0.16)',
  'accent-yellow-text': 'var(--yellow-200)',

  'accent-mauve': 'var(--mauve-500)',
  'accent-mauve-bg': 'hsla(266, 53%, 53%, 0.16)',
  'accent-mauve-text': 'var(--mauve-200)',

  'accent-rose': 'var(--rose-500)',
  'accent-rose-bg': 'hsla(332, 54%, 43%, 0.16)',
  'accent-rose-text': 'var(--rose-100)',

  // ============================================
  // SEMANTIC COLORS - INTERACTIVE ELEMENTS
  // ============================================
  'interactive-default': 'var(--gray-700)',
  'interactive-hover': 'var(--gray-600)',
  'interactive-pressed': 'var(--gray-800)',
  'interactive-disabled': 'var(--gray-800)',

  // ============================================
  // SEMANTIC COLORS - SHADOWS
  // ============================================
  'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
};
