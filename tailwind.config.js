module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        algemeen: {
          10: '#1a0a05',
          20: '#33130b',
          40: '#662715',
          60: '#993a20',
          72: '#b84626',
          80: '#cc4e2a',
          100: '#ff6135',
        },
        erfgoed: {
          10: '#1a0908',
          20: '#33120f',
          40: '#66241e',
          53: '#862f27',
          72: '#b84035',
          80: '#cc473b',
          100: '#ff594a',
        },
        base: {
          100: '#F2F2F2',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      gridTemplateColumns: {
        layout: '4rem 1fr 4rem',
      },
      gridTemplateRows: {
        layout: '4rem 1fr',
        cards: 'minmax(20%,40%) 1fr',
      },
    },
  },
  plugins: [],
}
