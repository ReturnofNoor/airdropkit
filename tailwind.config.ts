import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0f1a',
        neon: '#7cfdff',
        aura: '#b3fffd'
      }
    }
  },
  plugins: []
};

export default config;
