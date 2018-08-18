import Vue from 'vue'
import Router from 'vue-router'
import LoginContainer from '../components/pages/LoginPage'
import WelcomePage from '../components/pages/WelcomePage'
import RegistrationPage from '../components/pages/RegistrationPage'
import AccountConfirmationPage from '../components/pages/AccountConfirmationPage';
import DashboardPage from '../components/pages/DashboardPage';
import store from '../_store';

Vue.use(Router);

const authenticationCheck = (to, from, next) => {
  let authStore = store.state.authentication;
  // console.log("auth store: ", authStore);
  if(authStore && authStore.token && !!authStore.token.access_token) {
    next();
    return;
  }
  next('/login'); // If not authenticated, redirect to the login page
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomePage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginContainer
    },
    {
      path: '/register',
      name: 'Register',
      component: RegistrationPage
    },
    {
      path: '/confirmation_token=*',
      name: 'Account Confirmation',
      component: AccountConfirmationPage
    },
    {
      path: '/dashboard',
      name: 'Account Dashboard',
      component: DashboardPage,
      beforeEnter: authenticationCheck
    }
  ]
})
