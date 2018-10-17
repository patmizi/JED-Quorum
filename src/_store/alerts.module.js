import Vue from 'vue';
import {
  RESET_STATE,
  ALERT_SUCCESS,
  ALERT_INFO,
  ALERT_ERROR,
} from "./mutations.type";
import {
  SUCCESS_ALERT,
  INFO_ALERT,
  ERROR_ALERT,
} from './actions.type';

const initialState = {
  alertState: {
    "show": false,
    "timeout": 2000,
    "multi-line": true,
    "color": "success",
    "message": "",
  }
};

export const state = Object.assign({}, initialState);

export const actions = {
  [SUCCESS_ALERT] (context, msg) {
    return context.commit(ALERT_SUCCESS, msg);
  },
  [INFO_ALERT] (context, msg) {
    return context.commit(ALERT_INFO, msg);
  },
  [ERROR_ALERT] (context, msg) {
    return context.commit(ALERT_ERROR, msg);
  }
};

export const mutations = {
  [ALERT_SUCCESS] (state, msg) {
    Vue.set(state.alertState, 'message', msg);
    Vue.set(state.alertState, 'color', 'success');
    Vue.set(state.alertState, 'show', true);
  },
  [ALERT_INFO] (state, msg) {
    Vue.set(state.alertState, 'message', msg);
    Vue.set(state.alertState, 'color', 'info');
    Vue.set(state.alertState, 'show', true);
  },
  [ALERT_ERROR] (state, msg) {
    Vue.set(state.alertState, 'message', msg);
    Vue.set(state.alertState, 'color', 'info');
    Vue.set(state.alertState, 'show', true);
  },
};

const getters = {
  alertState(state) {
    return state.alertState;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
