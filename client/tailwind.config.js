/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mariner: {
          '50': '#eef8ff',
          '100': '#daefff',
          '200': '#bde3ff',
          '300': '#90d3ff',
          '400': '#5bb9ff',
          '500': '#359afc',
          '600': '#1f7cf1',
          '700': '#1765df',
          '800': '#1951b4',
          '900': '#1a478e',
          '950': '#152c56',
        },
      },
    },
  },
  plugins: [],
}