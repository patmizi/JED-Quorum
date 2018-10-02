// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import router from './router';
import store from './_store';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  theme: {
    primary: "#2196F3",
    // primary: "#f44336",
    secondary: "#03A9F4",
    accent: "#2196F3",
    error: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50"
  }
});

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyByzx6r7ToJ798jB27XJelSZdFctqCFWsc',
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
