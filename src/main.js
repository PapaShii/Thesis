import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'
import EditProductDetailsDialog from './components/Admin/Edit/EditProductDetailsDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-product-details-dialog', EditProductDetailsDialog)

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA66l8oEKPvWXIYnWHAbAKlfOfknXqr4Bk',
      authDomain: 'ham-thesis.firebaseapp.com',
      databaseURL: 'https://ham-thesis.firebaseio.com',
      projectId: 'ham-thesis',
      storageBucket: 'gs://ham-thesis.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
