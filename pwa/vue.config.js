module.exports = {
  outputDir: './static/',
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  devServer: {
    proxy: {
      '/login': {
        target: 'http://localhost:8000'
      },
      '/logout': {
        target: 'http://localhost:8000'
      },
      '/api': {
        target: 'http://localhost:8000'
      },
      '/admin': {
        target: 'http://localhost:8000'
      }
    }
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  chainWebpack: config => {
    config.module
      .rule('yaml')
      .test(/locales\/.*\.ya?ml$/)
      .type('javascript/auto')
      .use('json-loader')
      .loader('json-loader')
      .end()
      .use('yaml-loader')
      .loader('yaml-loader')
      .end()

    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
      .use('yaml-loader')
      .loader('yaml-loader')
      .end()
  }
}
