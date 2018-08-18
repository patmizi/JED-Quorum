<template>
  <v-container>
    <v-layout row class="text-xs-center">
      <!--play around with the grid width for optimal size-->
      <!--some widths aren't suitable for mobile viewports -->
      <v-flex xs6 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
        <v-card height="500px"></v-card>
      </v-flex>
      <v-flex xs12>
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Login</h4>
            </v-card-title>
            <LoginForm ref="loginForm"></LoginForm>
            <v-card-actions>
              <v-btn @click="handleLogin" color="primary">LOGIN</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-flex>
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
          }
        },
        computed: {
          ...mapState('authentication', ['status'])
        },
    }
</script>

<style scoped>

</style>
