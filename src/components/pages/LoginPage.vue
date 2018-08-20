<template>
  <v-container>
    <v-layout row class="text-xs-center">
      <v-flex xs0 sm2></v-flex>
      <v-flex xs12 sm8>
        <v-card flat>
          <v-layout>
            <v-flex xs1 md2 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
              <v-card height="500px"></v-card>
            </v-flex>
            <v-flex>
              <v-container style="position: relative;top: 13%;" class="text-xs-center">
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
                    <v-btn @click="handleLogin" color="primary">LOGIN</v-btn>
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
    import { mapState, mapActions } from 'vuex'
    import LoginForm from '../forms/LoginForm';

    export default {
        name: "LoginPage",
        components: {
          LoginForm
        },
        data() {
          return {
          }
        },
        mounted() {
          if(!!this.$store.state.authentication.user){
            this.$router.push('dashboard');
          }
        },
        methods: {
          ...mapActions('authentication', ['login', 'logout']),
          handleLogin() {
            let formData = this.$refs.loginForm.getFormValue();
            console.log("logging in with form data: ", formData);
            if(formData && formData.username && formData.password){
              this.$store.dispatch('authentication/login', {
                username: formData.username,
                password: formData.password
              }).catch((err) => {
                console.log("Error when logging in: ", err);
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

<style scoped>

</style>
