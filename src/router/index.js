import Vue from 'vue'
import Router from 'vue-router'
import LoginContainer from '../components/pages/LoginPage'
import WelcomePage from '../components/pages/WelcomePage'
import RegistrationPage from '../components/pages/RegistrationPage'
import AccountConfirmationPage from '../components/pages/AccountConfirmationPage';
import DashboardPage from '../components/pages/DashboardPage';
import PostRegistrationPage from '../components/pages/PostRegistrationPage';
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

// A user should only access the post-registration page
// after they have signed up successfully
const postRegistrationCheck = (to, from, next) => {
  if(from.path === "/register") {
    next();
    return;
  }
  next('/dashboard');
};

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: WelcomePage
    // },
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
    },
    {
      path: '/postregistration',
      name: 'Post Registration',
      component: PostRegistrationPage,
      beforeEnter: postRegistrationCheck
    },
    {
      path: '*', //default route
      redirect: 'dashboard'
    }
  ]
})
