/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: false,
  },
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 4px 20px 0px rgba(0, 0, 0, 0.1)',
        'card': '0px 4px 24px 0px #0000000F'
      },
      keyframes: {
        'dot-spin': {
          '0%, 100%': {
            'box-shadow': `
              0 -15px 0 0 #f39c12,
              10.6066px -10.6066px 0 0 #f39c12,
              15px 0 0 0 #f39c12,
              10.6066px 10.6066px 0 0 #f39c12,
              0 15px 0 0 rgba(243, 156, 18, 0.5),
              -10.6066px 10.6066px 0 0 rgba(243, 156, 18, 0.5),
              -15px 0 0 0 rgba(243, 156, 18, 0.5),
              -10.6066px -10.6066px 0 0 rgba(243, 156, 18, 0.5)`
          },
          '50%': {
            'box-shadow': `
              0 -15px 0 0 rgba(243, 156, 18, 0.5),
              10.6066px -10.6066px 0 0 rgba(243, 156, 18, 0.5),
              15px 0 0 0 #f39c12,
              10.6066px 10.6066px 0 0 #f39c12,
              0 15px 0 0 #f39c12,
              -10.6066px 10.6066px 0 0 #f39c12,
              -15px 0 0 0 rgba(243, 156, 18, 0.5),
              -10.6066px -10.6066px 0 0 rgba(243, 156, 18, 0.5)`
          },
          '75%': {
            'box-shadow': `
              0 -15px 0 0 #f39c12,
              10.6066px -10.6066px 0 0 rgba(243, 156, 18, 0.5),
              15px 0 0 0 rgba(243, 156, 18, 0.5),
              10.6066px 10.6066px 0 0 rgba(243, 156, 18, 0.5),
              0 15px 0 0 rgba(243, 156, 18, 0.5),
              -10.6066px 10.6066px 0 0 rgba(243, 156, 18, 0.5),
              -15px 0 0 0 #f39c12,
              -10.6066px -10.6066px 0 0 #f39c12`
          }
        }
      },
      animation: {
        'dot-spin': 'dot-spin 1.5s infinite linear'
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, #000000 0%, #613C29 100%)",
        "custom-header-gradient": "linear-gradient(67.62deg, #131313 3.3%, #613C29 95.7%)"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        alexandria: ['Alexandria', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@aegov/design-system'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),

  ],
}

