// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  spaLoadingTemplate: './app-loading.html',


  css: [
    "~/assets/main.scss",
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
 
  // buildModules: [  "@nuxtjs/moment"],
  modules: [
    '@invictus.codes/nuxt-vuetify',
    '@nuxtjs/google-fonts',
    "@pinia/nuxt",
    '@nuxtjs/color-mode',
   ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // vuetify: {
  //   customVariables: ["~/assets/variables.scss"],
  //   theme: {
  //     options: {
  //       customProperties: true,
  //     },
  //     dark: true,
  //     themes: {
  //       light: {
  //         primary: "#195176",
  //         accent: "#73BA15",
  //         secondary: "#D1DCE4",
  //         highlight: "#f8f8f8",
  //         info: "#ffffff",
  //         fade: "#828282",
  //         "grey-2": "#666666",
  //         "grey-1": "#212121",
  //         "grey-5": "#F2F2F2",
  //         "card-grey": "#9e9e9e",
  //         "card-title": "#212121",
  //         // warning: colors.amber.base,
  //         // error: colors.deepOrange.accent4,
  //         // success: colors.green.accent3,
  //       },
  //       dark: {
  //         primary: "#144EE3",
  //         secondary: "#0B101B",
  //         highlight: "#EB568E",
  //         "grey-2": "#181E29",
  //         "grey-1": "#C9CED6",
  //         "grey-5": "#424242",
  //         "card-grey": "#212121",
  //       },
  //     },
  //   },
  // },

  app: {
    head: {
      title: "Scissors Url",
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
    }
  }
})
