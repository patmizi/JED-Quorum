import * as authService from '../lib/auth';
import router from '../router';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

export const authentication = {
  namespaced: true,
  state: initialState,
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  actions: {
    login({dispatch, commit}, {username, password}) {
      commit('loginRequest', {username});

      return authService.login(username, password)
        .then((res) => {
          console.log('We have now logged in with res: ', res);
          commit('loginSuccess', res);
          router.push('dashboard');
        })
        .catch((err) => {
          console.log("Could not log in: ", err);
          commit('loginFailure', err);
          throw err;
        })
    },
    logout({dispatch, commit}) {
      return authService.logout()
        .then(() => {
          console.log("user logged out");
          commit('logout');
          router.push('login')
        })
    }
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.token = user.token;
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.token = null;
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.token = null;
      state.user = null;
    }
  }
};
