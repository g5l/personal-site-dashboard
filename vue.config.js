const SvgStore = require('webpack-svgstore-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new SvgStore({
        prefix: 'icon--',
        svgoOptions: {
          plugins: [
            { cleanupIDs: false },
            { collapseGroups: false },
            { removeTitle: true },
          ],
        },
      })
    ]
  }
}