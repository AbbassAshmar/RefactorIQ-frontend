
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          inverse: 'var(--text-inverse)',
        },
        background: {
          primary: 'var(--background-primary)',
          secondary: 'var(--background-secondary)',
          elevated: 'var(--background-elevated)',
        },
        surface: {
          default: 'var(--surface-default)',
          secondary: 'var(--surface-secondary)',
          hover: 'var(--surface-hover)',
          pressed: 'var(--surface-pressed)',
        },
        border: {
          default: 'var(--border-default)',
          focus: 'var(--border-focus)',
        },
        brand: {
          primary: 'var(--brand-primary)',
          hover: 'var(--brand-primary-hover)',
          pressed: 'var(--brand-primary-pressed)',
        },
        error: {
          bg: 'var(--error-bg)',
          text: 'var(--error-text)',
          border: 'var(--error-border)',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        h1: 'var(--heading-1)',
        h2: 'var(--heading-2)',
        h3: 'var(--heading-3)',
        h4: 'var(--heading-4)',
        h5: 'var(--heading-5)',
        h6: 'var(--heading-6)',
        body: 'var(--body)',
        'small-1': 'var(--small-1)',
        'small-2': 'var(--small-2)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
    },
  },
  plugins: [],
}
