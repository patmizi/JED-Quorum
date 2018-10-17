import Vue from 'vue';
import { PatientService, MedicalCaseService } from '../lib/services/api.service';

import {
  FETCH_PATIENTS,
  ADD_PATIENT,
  UPDATE_PATIENT,
  SUCCESS_ALERT,
  ERROR_ALERT,
  DELETE_PATIENT,
  SET_FOCUS_PATIENT,
  ADD_CASE,
  UPDATE_CASE,
  SET_FOCUS_CASE,
} from './actions.type';

import {
  SET_PATIENTS,
  RESET_FOCUSED_PATIENT_STATE,
  SET_FOCUSED_PATIENT,
  RESET_FOCUSED_CASE,
  SET_FOCUSED_CASE,
} from './mutations.type';

const initialState = {
  patients:[],
  focusedPatient: {
    Patient_Id: null,
    Address_Id: null,
    Contact_Number: "",
    Date_Of_Birth: "",
    Email: "",
    First_Name: "",
    Gender: "",
    Last_Name: "",
    address: {},
    cases: []
  },
  focusedMedicalCase: {
    Medical_Case_Id: null,
    Patient_Id: null,
    Medical_Case_Name: "",
    Medical_Case_Description: "",
    doctors: [],
  },
  loading: false,
};

export const state = Object.assign({}, initialState);

export const actions = {
  /**
   *******************
   * PATIENT ACTIONS *
   *******************
   */
  /**
   * Will set the focused patient by their Patient_Id
   */
  [SET_FOCUS_PATIENT] (context, id) {
    console.log('we have come this far...', context.getters.patientList);
    let patientList = context.getters.patientList;
    for (let i in patientList) {
      if(patientList[i].Patient_Id == id) {
        console.log('FOUND PATIENT: ', patientList[i]);
        return context.commit(SET_FOCUSED_PATIENT, patientList[i]);
      }
    }
  },
  /**
   * Will get the patient list from the backend and will update the patient state
   */
  [FETCH_PATIENTS] (context) {
    Vue.set(state, 'loading', true);
    return PatientService.get_all()
      .then((data) => {
        Vue.set(state, 'loading', false);
        return context.commit(SET_PATIENTS, data.data)
      })
      .catch((err) => {
        Vue.set(state, 'loading', false);
        return context.dispatch(ERROR_ALERT, "Could not get patient list: " + err)
      });
  },
  /**
   * Adds a patient from the focusedPatient state
   */
  [ADD_PATIENT] (context) {
    Vue.set(state, 'loading', true);
    console.log('loading: ', context.getters.focusedPatientState);
    return PatientService.add(context.getters.focusedPatientState)
      .then(() => {
        Vue.set(state, 'loading', false);
        context.commit(RESET_FOCUSED_PATIENT_STATE);
        context.dispatch(FETCH_PATIENTS);
        return context.dispatch(SUCCESS_ALERT, "Added a patient");
      })
      .catch((err) => {
        Vue.set(state, 'loading', false);
        return context.dispatch(ERROR_ALERT, "Error when adding a patient: " + err)
      })
  },
  /**
   * Updates a patient from the focusedPatientState
   */
  [UPDATE_PATIENT] (context) {
    Vue.set(state, 'loading', true);
    return PatientService.update(context.getters.focusedPatientState.Patient_Id, context.getters.focusedPatientState)
      .then(() => {
        Vue.set(state, 'loading', false);
        context.commit(RESET_FOCUSED_PATIENT_STATE);
        context.commit(RESET_FOCUSED_CASE);
        context.dispatch(FETCH_PATIENTS);
        return context.dispatch(SUCCESS_ALERT, "Updated patient")
      })
      .catch((err) => {
        Vue.set(state, 'loading', false);
        return context.dispatch(ERROR_ALERT, "Error when updating a patient: " + err)
      })
  },
  /**
   * Deletes a patient given the patient id and then refreshes the patient list
   */
  [DELETE_PATIENT] (context) {
    Vue.set(state, 'loading', true);
    return PatientService.delete(context.getters.focusedPatientState.Patient_Id)
      .then(() => {
        Vue.set(state, 'loading', false);
        context.commit(RESET_FOCUSED_PATIENT_STATE);
        context.commit(RESET_FOCUSED_CASE);
        context.dispatch(FETCH_PATIENTS);
        return context.dispatch(SUCCESS_ALERT, "Deleted patient");
      })
      .catch((err) => {
        Vue.set(state, 'loading', false);
        return context.dispatch(ERROR_ALERT, "Error when updating a patient: " + err);
      });
  },
  /**
   ************************
   * MEDICAL CASE ACTIONS *
   ************************
   */
  /**
   * Will set the focused medical case by the medical case id
   */
  [SET_FOCUS_CASE] (context, id) {
    let medicalCases = context.getters.focusedPatientState.cases;
    console.log("id: ", id);
    console.log("cases: ", medicalCases);
    for (let i in medicalCases) {
      if(medicalCases[i].Medical_Case_Id == id) {
        return context.commit(SET_FOCUSED_CASE, medicalCases[i]);
      }
    }
    return context.commit(RESET_FOCUSED_CASE);
  },
  /**
   * Adds a medical case from the focused medical case
   */
  [ADD_CASE] (context) {
    let medicalCase = context.getters.focusedMedicalCaseState;                // We make a copy of the focused medical state
    medicalCase.Patient_Id = context.getters.focusedPatientState.Patient_Id;  // We inject the patient ID
    Vue.set(state, 'loading', true);
    return MedicalCaseService.add(medicalCase)
      .then((data) => {
        let cachedPatient = context.getters.focusedPatientState;              // Make a copy of the cached patient state
        cachedPatient.cases.push(data.data);                                  // We append the created medical case
        Vue.set(state, 'loading', false);
        context.commit(SET_FOCUSED_PATIENT, cachedPatient);                   // We replace the focused patient data with the updated data
        console.log("We should have a new cached patient to render");
        context.dispatch(FETCH_PATIENTS);
        context.commit(RESET_FOCUSED_CASE);
        context.dispatch(SUCCESS_ALERT, "Added medical case");
      })
      .catch((err) => {
        Vue.set(state, 'loading', false);
        return context.dispatch(ERROR_ALERT, "Error when adding a medical case: " + err);
      });
  },
  /**
   * Updated the medical case in the focusedMedicalCase store
   */
  [UPDATE_CASE] (context) {
    let medicalCase = context.getters.focusedMedicalCaseState;                // We make a copy of the focused medical state
    medicalCase.Patient_Id = context.getters.focusedPatientState.Patient_Id;  // We inject the patient ID into the medical case
    Vue.set(state, 'loading', true);
    return MedicalCaseService.update(medicalCase.Medical_Case_Id, medicalCase)
      .then((data) => {
        let cachedPatient = context.getters.focusedPatientState;              // Make a copy of the cached patient state
        // cachedPatient.cases.push(data);                                    // We append the created medical case
        console.log("New Data: ", data.data);
        let updatedCase = data.data;
        for (let i in cachedPatient.cases) {
          // We assume that the updated Medical_Case_Id remains the same
          if(cachedPatient.cases[i].Medical_Case_Id == updatedCase.Medical_Case_Id) {
            console.log("FOUND MEDICAL CASE. UPDATING....");
            cachedPatient.cases[i] = updatedCase;                             // We replace the old case data
          }
        }
        Vue.set(state, 'loading', false);
        context.commit(SET_FOCUSED_PATIENT, cachedPatient);                     // We replace the focused patient data with the updated data
        context.dispatch(FETCH_PATIENTS);                                     // We refresh the patients list
        context.commit(RESET_FOCUSED_CASE);                                   // We
        context.dispatch(SUCCESS_ALERT, "Added medical case");
      })
      .catch((err) => {
        Vue.set(state, 'loading', false);
        return context.dispatch(ERROR_ALERT, "Error when adding a medical case: " + err);
      });
  }
};

export const mutations = {
  /**
   *********************
   * PATIENT MUTATIONS *
   *********************
   */
  [SET_PATIENTS] (state, patients) {
    if(patients.length) {
      Vue.set(state, 'patients', patients)
    }else{
      console.error("CANNOT SET PATIENTS IF IT NOT AN ARRAY!")
    }
  },
  [SET_FOCUSED_PATIENT] (state, patient) {
    if(patient) {
      Vue.set(state, 'focusedPatient', patient);
    } else {
      console.error("CANNOT SET PATIENT IF THERE IS NO VALUE!");
    }
  },
  [RESET_FOCUSED_PATIENT_STATE] (state) {
    if(state && state.focusedPatient) {
      for (let i in state.focusedPatient) {
        Vue.set(state.focusedPatient, i, initialState.focusedPatient[i]);
      }
    }
  },
  /**
   **************************
   * MEDICAL CASE MUTATIONS *
   **************************
   */
  [SET_FOCUSED_CASE] (state, medicalCase) {
    if(medicalCase){
      Vue.set(state, 'focusedMedicalCase', medicalCase);
    }else{
      console.error("CANNOT SET THE FOCUSED MEDICAL CASE OF NOTHING!");
    }
  },
  [RESET_FOCUSED_CASE] (state) {
    if(state && state.focusedMedicalCase) {
      for (let i in state.focusedMedicalCase) {
        Vue.set(state.focusedMedicalCase, i, initialState.focusedMedicalCase[i]);
      }
    }
  },
};

const getters = {
  isSending(state) {
    return state.loading;
  },
  patientList(state) {
    return state.patients;
  },
  focusedMedicalCaseState(state) {
    return state.focusedMedicalCase;
  },
  focusedPatientState(state){
    return state.focusedPatient;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
