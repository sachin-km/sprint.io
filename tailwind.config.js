module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#2563EB',
        accent: '#FACC15',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
