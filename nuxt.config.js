import pkg from './package'
require('dotenv').config();
const {} = process.env;

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      { src: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" },
      { src: "https://unpkg.com/popper.js"},
      { src: "https://unpkg.com/tooltip.js"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/calendar.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.node = {
        fs: "empty" // TwitterAPIを使うのに必要
      };
    }
  },
  serverMiddleware: [
  ],
  env: {
  },
  vue: {
    config: {
      url: {
        tweets: "https://us-central1-tenreki-d1e2f.cloudfunctions.net/tweets"
      }
    }
  }
}

