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
        base: {
          100: '#F2F2F2',
          200: '#666666',
        },
        erfgoed: {
          10: '#1a0908',
          20: '#33120F',
          40: '#66241E',
          53: '#862f27',
          72: '#B84035',
          80: '#CC473B',
          100: '#FF594A',
        },
        evenementen: {
          10: '#1A1407',
          20: '#33290E',
          30: '#66511B',
          66: '#A8862D',
          72: '#B89231',
          80: '#CCA337',
          100: '#FFCB44',
        },
        ondernemen: {
          10: '#11171A',
          20: '#222E33',
          40: '#455B66',
          66: '#7196A8',
          72: '#7BA4B8',
          80: '#89B6CC',
          100: '#ACE4FF',
        },
        toerisme: {
          10: '#161A0D',
          20: '#2C3319',
          40: '#596633',
          51: '#708140',
          72: '#A0B85B',
          80: '#B1CC65',
          100: '#DDFF7F',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      gridTemplateColumns: {
        layout: '4rem 1fr 4rem',
        data: '70% 30%',
      },
      gridTemplateRows: {
        layout: '4rem 1fr',
        cards: 'minmax(20%,40%) 1fr',
      },
      flex: {
        2: '2 1 0%',
      },
    },
  },
  plugins: [],
}
