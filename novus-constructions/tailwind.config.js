/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#2D3748',
				secondary: '#4A5568',
				accent: '#F6AD55',
				background: '#F7FAFC'
			},
			fontFamily: {
				sans: ['Roboto', 'sans-serif'],
				heading: ['Roboto', 'sans-serif']
			}
		}
	},
	plugins: []
};
