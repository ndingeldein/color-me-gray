// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
require('typeface-roboto')
import DefaultLayout from '~/layouts/Default.vue'
import Vuelidate from 'vuelidate'
import VueInputAutowidth from 'vue-input-autowidth'

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.use(Vuelidate)
  Vue.use(VueInputAutowidth)
  Vue.component('Layout', DefaultLayout)
}
