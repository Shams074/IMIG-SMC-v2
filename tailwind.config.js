/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50:  '#EBF5FB',
          100: '#D6EAF8',
          200: '#A9CCE3',
          300: '#7FB3D3',
          400: '#5499C2',
          500: '#2E86C1',
          600: '#2471A3',
          700: '#1A5276',
          800: '#154360',
          900: '#0D2B3E',
        },
        teal: {
          400: '#1ABC9C',
          500: '#17A589',
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif'],
        serif: ['var(--font-muli)', 'Muli', 'Mulish', 'sans-serif'],
        heading: ['var(--font-muli)', 'Muli', 'Mulish', 'sans-serif'],
        muli: ['var(--font-muli)', 'Muli', 'Mulish', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      animation: {
        'ticker': 'ticker 15s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
