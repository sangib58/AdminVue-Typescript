/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import { aliases,mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons:{
    defaultSet:'mdi',
    aliases,
    sets:{
      mdi
    }
  },
  theme: {
    defaultTheme: 'light',
  },
})
