import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import Vue from 'vue'
import Router from 'vue-router'
import LoginContainer from '../components/pages/LoginPage'
import WelcomePage from '../components/pages/WelcomePage';

Vue.use(Router)

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
    }
  ]
})
