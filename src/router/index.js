import Vue from 'vue'
import Router from 'vue-router'
import LoginContainer from '../components/pages/LoginPage'
import WelcomePage from '../components/pages/WelcomePage'
import RegistrationPage from '../components/pages/RegistrationPage'
import AccountConfirmationPage from '../components/pages/AccountConfirmationPage';
import DashboardPage from '../components/pages/DashboardPage';

Vue.use(Router);

export default new Router({
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
      component: DashboardPage
    }
  ]
})
