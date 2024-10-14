/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit', // Enables Just-In-Time (JIT) mode for on-demand style generation
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Specifies the paths to all your template files
  theme: {
    extend: {}, // Here you can extend the default Tailwind theme if needed
  },
  plugins: [], // Any plugins you want to include for additional functionality
};
