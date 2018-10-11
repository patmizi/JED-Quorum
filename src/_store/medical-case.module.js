import Vue from 'vue';
import {
  RESET_FOCUS_CASE
} from './actions.type';
import {
  RESET_STATE,
  RESET_FOCUSED_CASE,
  SET_FOCUSED_CASE,
  SET_CASES,
} from "./mutations.type";

const initialState = {
  medicalCases: [
    {
      "Medical_Case_Id": 1,
      "Patient_Id": 1,
      "Medical_Case_Name": "Common Cold",
      "Medical_Case_Description": "Patient has a runny nose and a sore throat. No prescription required",
      "doctors": [],
    },
    {
      "Medical_Case_Id": 2,
      "Patient_Id": 1,
      "Medical_Case_Name": "Fever",
      "Medical_Case_Description": "Patient had a fever as a result of infection via tropical virus. recorded temperature was well over 40 degrees. Prescribed patient with antibiotic",
      "doctors": [],
    }
  ],
  focusedMedicalCase: {
    "Medical_Case_Id": 1,
    "Patient_Id": 1,
    "Medical_Case_Name": "Common Cold",
    "Medical_Case_Description": "Patient has a runny nose and a sore throat. No prescription required",
    "doctors": [],
  }
};

export const state = Object.assign({}, initialState);

export const actions = {
  [RESET_FOCUS_CASE] (context) {
    console.log("WE RESET THE FOCUS STATE");
    return context.commit(RESET_FOCUSED_CASE)
  },
};

export const mutations = {
  [RESET_STATE] () {
    console.warn("PATIENT STATE IS BEING RESET...");
    for (let i in state) {
      Vue.set(state, i, initialState[i])
    }
  },
  [RESET_FOCUSED_CASE] (state) {
    if(state && state.focusedMedicalCase) {
      for (let i in state.focusedMedicalCase) {
        Vue.set(state.focusedMedicalCase, i, initialState.focusedMedicalCase[i])
      }
    }
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
