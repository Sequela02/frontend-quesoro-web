/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',     // Incluir archivos dentro de la carpeta src
    './components/**/*.{ts,tsx}',          // Incluir la carpeta de componentes si está fuera de src
  ],
  theme: {
    extend: {
    },}
}
