/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.ts',
  ],
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.ts',
    ],
  },
  // Other Tailwind CSS configuration...
};