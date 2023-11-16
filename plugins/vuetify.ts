// plugins/vuetify.js
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'


const myCustomDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#0B101B',
    surface: '#0B101B',
    primary: '#144EE3',
    'primary-darken-1': '#3700B3',
    secondary: '#EB56E8',
    'secondary-darken-1': '#018786',
    'grey-1': '#181E29',
    'grey-2': '#C9DEC6',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
    theme: {
      defaultTheme: 'myCustomDarkTheme',
      themes: {
        myCustomDarkTheme,
      },
    }
  })

  nuxtApp.vueApp.use(vuetify)
})