<template>
  <v-container>
    <v-layout row class="text-xs-center" style="margin-top: 20%; margin-left: 20%; margin-right: 20%;">
      <v-flex></v-flex>
      <v-flex sm8>
        <v-card style="padding-bottom: 20%">
          <v-layout>
            <v-flex>
              <v-img
                :src="logo"
                max-width="150px"
                style="position: relative;top: 20%;left:38%"
              ></v-img>
              <v-container style="position: relative;top: 20%;" class="text-xs-center">
                <v-card flat>
                  <v-card-title primary-title>
                    <h4>Login to your account</h4>
                  </v-card-title>
                  <LoginForm
                    ref="loginForm"
                  ></LoginForm>
                  <br>
                  <v-card-actions>
                    <v-btn flat color="primary" @click="changePage('register')">Create an account</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="handleLogin"
                      color="primary"
                      :loading="sending"
                      :disabled="sending"
                    >LOGIN
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-container>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs0 sm2></v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import LoginForm from '../forms/LoginForm';
  import logo from '../../assets/logo.png';

  export default {
    name: "LoginPage",
    components: {
      LoginForm
    },
    data() {
      return {
        loginError: false,
        loginErrorMessage: "",
        sending: false,
        logo: logo,
      }
    },
    mounted() {
      if (!!this.$store.state.authentication.user) {
        this.$router.push('dashboard');
      }
    },
    methods: {
      ...mapActions('authentication', ['login', 'logout']),
      handleLogin() {
        let formData = this.$refs.loginForm.getFormValue();
        console.log("logging in with form data: ", formData);
        if (formData && formData.username && formData.password) {
          this.$refs.loginForm.setSubmitState(true);
          this.sending = true;
          this.$store.dispatch('authentication/login', {
            username: formData.username,
            password: formData.password
          }).catch((err) => {
            console.log("Error when logging in: ", err);
            this.$refs.loginForm.setSubmitState(false);
            this.sending = false;
            this.$refs.loginForm.failLogin();
          })
        }
      },
      changePage(relativeUrl) {
        this.$router.push(relativeUrl);
      }
    },
    computed: {
      ...mapState('authentication', ['status'])
    },
  }
</script>

<style>

</style>
