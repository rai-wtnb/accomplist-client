module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        black: '#3a353f',
        blue: '#505668',
        beige: '#f1ece1',
        red: '#c05850',
        notifyBlue: '#2c96ce',
      },
      opacity: {
        '90': '.9',
      },
      inset: {
        'custom': '2%',
      },
      fontSize: {
        '7xl': '5rem',
      },
    },
  },
  variants: {},
  plugins: []
}
