import Vue from 'vue';
import { DoctorService } from '../lib/services/api.service';
import {
  FETCH_DOCTORS,
  FOCUS_DOCTOR,
  SET_FOCUS_DOCTOR,
  RESET_FOCUS_DOCTOR,
  STATE_RESET, ADD_DOCTOR,
} from './actions.type';
import {
  RESET_STATE,
  SET_DOCTORS,
  RESET_FOCUSED_DOCTOR_STATE,
  SET_FOCUSED_DOCTOR,
} from "./mutations.type";

const initialState = {
  focusedDoctor: {
    "Doctor_Id": null,
    "Address_Id": null,
    "Contact_Number": "",
    "Date_Of_Birth": "",
    "Email": "",
    "First_Name": "",
    "Gender": "",
    "Last_Name": "",
    "address": {},
  },
  doctors: []
};

export const state = Object.assign({}, initialState);

export const actions = {
  [FETCH_DOCTORS](context) {
    return DoctorService.get_all()
      .then((data) => {
        console.log("FETCH DOCTORS: ", data);
        // This can be a pain point since we don't make any checks here against the data
        context.commit(SET_DOCTORS, data.data);
        return data.data;
      })
  },
  [FOCUS_DOCTOR](context, id) {
    return DoctorService.get(id)
      .then((data) => {
        console.log("GET DOCTOR: ", data);
        // We should be getting an array but we only want the first element
        context.commit(SET_FOCUSED_DOCTOR, data.data[0])
      })
  },
  [SET_FOCUS_DOCTOR](context, data) {
    return context.commit(SET_FOCUS_DOCTOR, data);
  },
  [RESET_FOCUS_DOCTOR](context) {
    console.log("WE RESET THE FOCUS STATE");
    return context.commit(RESET_FOCUSED_DOCTOR_STATE);
  },
  [ADD_DOCTOR] (context, data) {
    console.log("We are adding a doctor: ", data);
    return DoctorService.add(data)
      .then((res) => {
        console.log("We successfully added a doctor: ", res);
        return context.commit(RESET_FOCUSED_DOCTOR_STATE);
      });
  },
  [STATE_RESET](context) {
    return context.commit(RESET_STATE);
  }
};

export const mutations = {
  [SET_DOCTORS](state, doctors) {
    state.doctors = doctors;
  },
  [SET_FOCUSED_DOCTOR](state, doctor) {
    state.focusedDoctor = doctor;
    console.log("Focused doctor state: ", state.focusedDoctor);
  },
  [RESET_FOCUSED_DOCTOR_STATE]() {
    if (state && state.focusedDoctor) {
      for (let i in state.focusedDoctor) {
        Vue.set(state.focusedDoctor, i, initialState.focusedDoctor[i]);
      }
    }
  },
  [RESET_STATE]() {
    console.warn("DOCTOR STATE IS BEING RESET...");
    for (let i in state) {
      Vue.set(state, i, initialState[i])
    }
  }
};

const getters = {
  doctors(state) {
    return state.doctors;
  },
  focusedDoctor(state) {
    return state.focusedDoctor;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
