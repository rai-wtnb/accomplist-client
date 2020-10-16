module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        black: '#3a353f',
        blue: '#505668',
        beige: '#f1ece1',
        red: '#c05850',
      },
      opacity: {
        '90': '.9',
      },
      inset: {
        'custom': '5%',
      },
    },
  },
  variants: {},
  plugins: []
}
