import Vue from 'vue';
import Vuex from 'vuex';
import { authentication } from "./jwt-auth.module";
import patients from './patient.module';
import doctors from './doctor.module';
import alerts from './alerts.module';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    authentication,
    patients,
    doctors,
    alerts,
  }
});
