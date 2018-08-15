import * as authService from '../lib/auth';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({dispatch, commit}, {username, password}) {
      commit('loginRequest', {username});

      authService.login(username, password)
        .then((res) => {
          console.log('We have now logged in with res: ', res);
          commit('loginSuccess', res);
        })
        .catch((err) => {
          console.log("Could not log in: ", err);
          commit('loginFailure', err);
        })
    },
    logout({commit}) {
      authService.logout();
      commit('logout');
    }
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    }
  }
};
