/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'header': '3.75rem',
        'input': '2.875rem'
      },
      width: {
        'app': '71.875rem',
        'input': '22.5rem',
        'span': '1px'
      },
      boxShadow: {
        'header': '0px 1px 1px rgb(0 0 0 / 12%)',
        'tippy': 'rgb(0 0 0 / 12%) 0px 2px 12px'
      },
      margin: {
        'header': '3.75rem',
        'center': '0 auto',
        'span': '-3px 0',
        'search': '-12px -16px'
      },
      padding: {
        'search': '11px 16px 11px 16px;'
      },
      maxWidth: {
        'app': '71.875rem',
      },
      backgroundColor: {
        'input': 'rgba(22, 24, 35, .06)',
        'span': 'rgba(22, 24, 35, .12)',
      },
      colors: {
        'search': 'rgba(22, 24, 35, 0.34)',
        'input': 'rgba(254, 44, 85, 1)',
        'primary': 'rgb(254, 44, 85)',
        'boldColor': 'rgba(22, 24, 35, 1)',
        'textColor': "#161823",
        'span': 'rgba(22, 24, 35, .12)',
      },
      borderWidth: {
        'focus': '1px'
      },
      spacing: {
        '50%': '-50%',
        'poper': 'min(calc(calc(100vh - 96px) - 60px), 734px)',
        'menu': '14rem',
        '15': '3.75rem',
        'sidebar-h': 'calc(100vh - 2.75rem - 16px)',
        'sidebar-h-sm': 'calc(100vh - 2.75rem - 30px)',
        'sidebar-w': '22.5rem',
        'sidebar-w-small': '15rem',
        'sidebar-wrapper-sm': '20rem',
        'main-w': '43rem',
        'logonForm-w': '30rem',
        'video': 'calc(450px + ((100vw - 768px) / 1152) * 100)'

      },
      gridTemplateColumns: {
        'userVideo': 'repeat(auto-fill, minmax(184px, 1fr))',
      }
    },
  },
  plugins: [],
}
