export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2563EB', 600: '#1D4ED8' },
        secondary: '#6366F1',
        accent: '#14B8A6',
        page: 'var(--bg)',
        card: 'var(--card)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
      },
    },
  },
};
