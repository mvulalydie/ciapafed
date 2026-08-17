import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#1F4E3A',
        natural: '#6C8E67',
        sand: '#E8D8C3',
        soft: '#F5F2EC'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(31, 78, 58, 0.12)'
      }
    }
  },
  plugins: []
} satisfies Config;
