import Vue from 'vue';
import { MedicalCaseService } from '../lib/services/api.service';
import {
  RESET_FOCUS_CASE,
  SET_FOCUSED_PATIENT_CASE,
  ADD_CASE,
  SET_FOCUS_CASE,
  UPDATE_CASE,
  SET_MEDICAL_CASES,
} from './actions.type';
import {
  RESET_STATE,
  RESET_FOCUSED_CASE,
  SET_FOCUSED_CASE,
  SET_CASES,
  SET_FOCUSED_PATIENT_ID_CASE,
  RESET_MEDICAL_CASES,
} from "./mutations.type";


const initialState = {
  medicalCases: [],
  focusedMedicalCase: {
    Medical_Case_Id: null,
    Patient_Id: null,
    Medical_Case_Name: "",
    Medical_Case_Description: "",
    doctors: [],
  }
};

export const state = Object.assign({}, initialState);

export const actions = {
  [RESET_FOCUS_CASE] (context) {
    console.log("WE RESET THE FOCUS STATE");
    return context.commit(RESET_FOCUSED_CASE)
  },
  [SET_FOCUSED_PATIENT_CASE] (context, id) {
    return context.commit(SET_FOCUSED_PATIENT_ID_CASE, id);
  },
  [ADD_CASE] (context, data) {
    console.log('ADDING CASE...', data);
    return MedicalCaseService.add(data)
      .then((res) => {
        console.log('successfully added a medical case to patient: ', res);
        return context.commit(RESET_FOCUSED_CASE);
      })
  },
  [UPDATE_CASE] (context, data) {
    console.log('UDPATING CASE: ', data);
    return MedicalCaseService.update(data.Medical_Case_Id, data)
      .then((res) => {
        return context.commit(RESET_MEDICAL_CASES);
      });
  },
  [SET_FOCUS_CASE] (context, data) {
    return context.commit(SET_FOCUSED_CASE, data);
  },
  [SET_MEDICAL_CASES] (context, data) {
    return context.commit(SET_CASES, data)
  },
};

export const mutations = {
  // [RESET_STATE] () {
  //   console.warn("STATE IS BEING RESET...");
  //   for (let i in state) {
  //     Vue.set(state, i, initialState[i])
  //   }
  // },
  [RESET_FOCUSED_CASE] (state) {
    console.warn('FOCUSED CASE STATE IS BEING RESET');
    if(state && state.focusedMedicalCase) {
      for (let i in state.focusedMedicalCase) {
        Vue.set(state.focusedMedicalCase, i, initialState.focusedMedicalCase[i])
      }
    }
  },
  [RESET_MEDICAL_CASES] (state) {
    console.warn('MEDICAL CASES STATE IS BEING RESET');
    if(state && state.medicalCases) {
      Vue.set(state, 'medicalCases', initialState.medicalCases);
    }
  },
  [SET_FOCUSED_PATIENT_ID_CASE] (state, id) {
    Vue.set(state.focusedMedicalCase, 'Patient_Id', id);
  },
  [SET_FOCUSED_CASE] (state, data) {
    Vue.set(state, 'focusedMedicalCase', data);
  },
  [SET_CASES] (state, data) {
    Vue.set(state, 'medicalCases', data);
  },
};

const getters = {
  focusedPatientMedicalCases(state) {
    return state.medicalCases;
  },
  focusedMedicalCase(state) {
    return state.focusedMedicalCase;
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};
