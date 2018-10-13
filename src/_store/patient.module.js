import Vue from 'vue';
import { PatientService } from '../lib/services/api.service';
import {
  FETCH_PATIENTS,
  FOCUS_PATIENT,
  ADD_PATIENT,
  SET_FOCUS_PATIENT,
  RESET_FOCUS_PATIENT,
  DELETE_PATIENT,
  UPDATE_PATIENT,
  STATE_RESET,
  REFRESH_FOCUSED_PATIENT,
} from './actions.type';
import {
  SET_PATIENTS,
  RESET_STATE,
  RESET_FOCUSED_PATIENT_STATE,
  SET_FOCUSED_PATIENT,
} from "./mutations.type";

const initialState = {
  focusedPatient: {
    "Patient_Id": null,
    "Address_Id": null,
    "Contact_Number": "",
    "Date_Of_Birth": "",
    "Email": "",
    "First_Name": "",
    "Gender": "",
    "Last_Name": "",
    "address": {},
    "cases": []
  },
  patients: [],
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
  },
  [REFRESH_FOCUSED_PATIENT] (context, id) {
    return PatientService.get(id)
      .then((data) => {
        context.commit(SET_FOCUS_PATIENT, data.data);
        return data.data;
      })
  },
  [FOCUS_PATIENT] (context, id) {
    return PatientService.get(id)
      .then((data) => {
        console.log("GET PATIENT: ", data);
        // We should be getting an array but we only want the first element
        context.commit(SET_FOCUSED_PATIENT, data.data)
      })
  },
  [SET_FOCUS_PATIENT] (context, data) {
    return context.commit(SET_FOCUS_PATIENT, data);
  },
  [RESET_FOCUS_PATIENT] (context) {
    console.log("WE RESET THE FOCUS STATE");
    return context.commit(RESET_FOCUSED_PATIENT_STATE);
  },
  [ADD_PATIENT] (context, data) {
    console.log("We are adding a patient: ", data);
    return PatientService.add(data)
      .then((res) => {
        console.log("We successfully added a patient: ", res);
        return context.commit(RESET_FOCUSED_PATIENT_STATE);
      });
  },
  [DELETE_PATIENT] (context, id) {
    console.log('Deleting patient with id: ', id);
    return PatientService.delete(id)
      .then((res) => {
        console.log("Got response...", res);
        return context.commit(RESET_FOCUSED_PATIENT_STATE);
      })
  },
  [UPDATE_PATIENT] (context, data) {
    console.log('We are updating a patient with data: ', data);
    return PatientService.update(data.Patient_Id, data)
      .then((res) => {
        console.log('We successfully updated a patient: ', res);
        return context.commit(RESET_FOCUSED_PATIENT_STATE);
      })
  },
  [STATE_RESET] (context) {
    return context.commit(RESET_STATE);
  }
};

export const mutations = {
  [SET_PATIENTS] (state, patients) {
    state.patients = patients;
  },
  [SET_FOCUSED_PATIENT] (state, patient) {
    state.focusedPatient = patient;
    console.log("Focused patient state: ", state.focusedPatient);
  },
  [RESET_FOCUSED_PATIENT_STATE] () {
    if(state && state.focusedPatient){
      for (let i in state.focusedPatient) {
        Vue.set(state.focusedPatient, i, initialState.focusedPatient[i]);
      }
    }
  },
  [RESET_STATE] () {
    console.warn("PATIENT STATE IS BEING RESET...");
    for (let i in state) {
      Vue.set(state, i, initialState[i])
    }
  }
};

const getters = {
  patients(state) {
    return state.patients;
  },
  focusedPatient(state) {
    return state.focusedPatient;
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};
