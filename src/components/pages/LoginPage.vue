<template>
  <v-container>
    <v-toolbar color="primary">
      <v-icon style="margin-left: 37%;">assignment</v-icon>
      <v-toolbar-title>Doctor Case Management System</v-toolbar-title>
    </v-toolbar>
    <v-layout row class="text-xs-center" style="margin-top: 5%; margin-left: 20%; margin-right: 20%;">
      <v-flex></v-flex>
      <v-flex sm8>
        <v-card flat>
          <v-layout>
            <v-flex md2 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
              <v-card height="555"></v-card>
            </v-flex>
            <v-flex>
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
            this.sending = false
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
