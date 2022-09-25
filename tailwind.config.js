module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'bg-yellow-600',
    'bg-blue-600',
    'bg-green-600',
    'bg-purple-600',
    'bg-red-600',
    'bg-orange-600',
    'bg-gray-600',
    'border-yellow-600',
    'border-blue-600',
    'border-green-600',
    'border-purple-600',
    'border-red-600',
    'border-orange-600',
    'border-gray-600',
  ]
}

