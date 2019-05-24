const config = {
  devServer: {},
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            './src/assets/styles/element-variables.scss',
            './src/assets/styles/vars.scss',
            './src/assets/styles/mixins.scss'
          ]
        })
        .end()
    })
  }
}

if (process.env.VUE_APP_CORS === 'true') {
  config.devServer = {
    proxy: {
      '/': {
        target: process.env.VUE_APP_URL,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^': ''
        }
      }
      // '/personalResources': {
      //   target: 'http://172.26.106.10:8080/personalResources',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/personalResources': ''
      //   }

      // }
    }
  }
}

module.exports = config
