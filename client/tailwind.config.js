import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
        'raleway': ['Raleway']
      },
      colors: {
        'pippin': {
          '50': '#fdf4f3',
          '100': '#fbe7e5',
          '200': '#fadcd9',
          '300': '#f3b4ae',
          '400': '#ea897f',
          '500': '#de6155',
          '600': '#ca4538',
          '700': '#a9372c',
          '800': '#8c3128',
          '900': '#752e27',
          '950': '#3f1410',
        },
        'sunglow': {
          '50': '#fffaeb',
          '100': '#fff1c6',
          '200': '#ffe288',
          '300': '#ffcb45',
          '400': '#ffb720',
          '500': '#f99407',
          '600': '#dd6d02',
          '700': '#b74b06',
          '800': '#94390c',
          '900': '#7a300d',
          '950': '#461702',
        },
      },
    },
  },
  plugins: [flowbitePlugin],
};
