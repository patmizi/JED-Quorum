import Vue from 'vue';
import { PatientService } from '../lib/services/api.service';
import {
  FETCH_PATIENTS,
} from './actions.type';
import {
  SET_PATIENTS,
  RESET_STATE,
} from "./mutations.type";

const initialState = {
  focusedPatient: {
    "Contact_Number": "",
    "Date_Of_Birth": "",
    "Email": "",
    "First_Name": "",
    "Gender": "",
    "Last_Name": "",
  },
  patients: []
};

export const state = Object.assign({}, initialState);

export const actions = {
  [FETCH_PATIENTS] (context) {
    return PatientService.get_all()
      .then((data) => {
        console.log("FETCH PATIENTS: ", data);
        // This can be a pain point since we don't make any checks here against the data
        context.commit(SET_PATIENTS, data.data);
        return data.data;
      })
  }
};

export const mutations = {
  [SET_PATIENTS] (state, patients) {
    state.patients = patients;
  },
  [RESET_STATE] () {
    for (let i in state) {
      Vue.set(state, i, initialState[i])
    }
  }
};

const getters = {
  patients(state) {
    return state.patients;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
