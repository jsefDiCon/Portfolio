const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: v('ink'),
        paper: v('paper'),
        surface: v('surface'),
        night: v('night'),
        muted: v('muted'),
        line: v('line'),
        coal: '#191B19',
        accent: '#2B3BFF',
        violet: '#6D2BFF',
        volt: '#C8F031',
      },
      fontFamily: {
        display: ['"Archivo"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
}
