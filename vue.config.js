const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  devServer:{
    proxy: {
     "/api": {
        target: "https://itunes.apple.com/hk/", 
        changeOrigin: true,
        secure:true,
        pathRewrite: {
        "^/api": ''
        }
      }
     }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: []
    }
  },
  pwa: {

    // workboxOptions: {
    //   swSrc: "./src/registerServiceWorker.js", // 自定义sw文件的位置
    //   importWorkboxFrom: "disabled" // 是否要引入线上的service-worker文件，我们只需要自己定义的文件，不需要谷歌提供的sw文件
    // }
    //  workboxOptions: {
    // // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    // skipWaiting: true,
    // clientsClaim: true,
    // importWorkboxFrom: 'disabled',
    // importsDirectory: 'js',
    // navigateFallback: '/',
    // navigateFallbackBlacklist: [/\/api\//]
  // } 
  } 
})