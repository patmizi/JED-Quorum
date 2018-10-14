import Vue from 'vue';
import Vuex from 'vuex';
import { authentication } from "./jwt-auth.module";
// import patients from './patient.module';     // Deprecated by patientv2
// import cases from './medical-case.module';   // Deprecated by patientv2
import patients from './patientv2.module';
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
    // cases, // Deprecated by patient v2
  }
});
