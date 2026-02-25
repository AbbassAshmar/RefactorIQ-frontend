/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				// ============================================
				// TEXT
				// ============================================
				text: {
					primary: 'var(--text-primary)',
					secondary: 'var(--text-secondary)',
					tertiary: 'var(--text-tertiary)',
					disabled: 'var(--text-disabled)',
					inverse: 'var(--text-inverse)',
					brand: 'var(--text-brand)',
					link: 'var(--text-link)',
					'link-hover': 'var(--text-link-hover)',
				},

				// ============================================
				// BACKGROUNDS (Consolidated from Surfaces)
				// ============================================
				background: {
					primary: 'var(--background-primary)',     // Base layer
					secondary: 'var(--background-secondary)',   // Cards/Panels
					tertiary: 'var(--background-tertiary)',    // Nested elements
					quaternary: 'var(--background-quaternary)', // Deep nesting
					elevated: 'var(--background-elevated)',    // Modals/Popovers
					overlay: 'var(--background-overlay)',      // Backdrops
					inverse: 'var(--background-inverse)',      // High-contrast
					// Universal Interactive Overlays
					hover: 'var(--background-hover)',
					pressed: 'var(--background-pressed)',
					selected: 'var(--background-selected)',
				},

				// ============================================
				// BORDERS
				// ============================================
				border: {
					default: 'var(--border-default)',
					secondary: 'var(--border-secondary)',
					tertiary: 'var(--border-tertiary)',
					focus: 'var(--border-focus)',
					brand: 'var(--border-brand)',
				},

				// ============================================
				// BRAND / ACTIONS
				// ============================================
				brand: {
					primary: 'var(--brand-primary)',
					hover: 'var(--brand-primary-hover)',
					pressed: 'var(--brand-primary-pressed)',
					bg: 'var(--brand-primary-bg)',
					secondary: 'var(--brand-secondary)',
					text: 'var(--brand-text)',
				},

				// ============================================
				// SEMANTIC STATES
				// ============================================
				success: {
					default: 'var(--success-default)',
					hover: 'var(--success-hover)',
					text: 'var(--success-text)',
					bg: 'var(--success-bg)',
					border: 'var(--success-border)',
				},
				error: {
					default: 'var(--error-default)',
					hover: 'var(--error-hover)',
					text: 'var(--error-text)',
					bg: 'var(--error-bg)',
					border: 'var(--error-border)',
				},
				warning: {
					default: 'var(--warning-default)',
					hover: 'var(--warning-hover)',
					text: 'var(--warning-text)',
					bg: 'var(--warning-bg)',
					border: 'var(--warning-border)',
				},
				info: {
					default: 'var(--info-default)',
					hover: 'var(--info-hover)',
					text: 'var(--info-text)',
					bg: 'var(--info-bg)',
					border: 'var(--info-border)',
				},

				// ============================================
				// ACCENTS
				// ============================================
				accent: {
					yellow: {
						default: 'var(--accent-yellow)',
						bg: 'var(--accent-yellow-bg)',
						text: 'var(--accent-yellow-text)',
					},
					mauve: {
						default: 'var(--accent-mauve)',
						bg: 'var(--accent-mauve-bg)',
						text: 'var(--accent-mauve-text)',
					},
					rose: {
						default: 'var(--accent-rose)',
						bg: 'var(--accent-rose-bg)',
						text: 'var(--accent-rose-text)',
					},
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