import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [require('clada-storybook/tailwind.config.ts')],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/clada-storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-poppins)'],
      },
      spacing: {
        header: '80px',
        content: '680px',
      },
    },
  },
  plugins: [],
};
export default config;
