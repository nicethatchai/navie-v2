import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import {store} from './store'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VDialog,
  VAlert,
  VTextField,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'


Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VDialog,
    VAlert,
    VTextField,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDbFh5FU2FEI6PyEyZOZ5lu8yguiK4jKdk',
      authDomain: 'navie-e0b65.firebaseapp.com',
      databaseURL: 'https://navie-e0b65.firebaseio.com',
      projectId: 'navie-e0b65',
      storageBucket: 'navie-e0b65.appspot.com',
      messagingSenderId: '139311119369'
    })
  }
})
