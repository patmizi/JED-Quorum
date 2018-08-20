<template>
  <div>
    <v-container>
      <v-layout row class="text-xs-center">
        <v-flex xs0 sm2></v-flex>
        <v-flex xs12 sm8>
          <v-card flat>
            <v-layout>
              <v-flex xs1 md2 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
                <v-card height="570px"></v-card>
              </v-flex>
              <v-flex>
                <v-container style="position: relative;top: 13%;" class="text-xs-center">
                  <v-card flat>
                    <v-card-title primary-title>
                      <h4>Account Registration</h4>
                    </v-card-title>
                    <RegistrationForm
                      ref="registerForm"
                    ></RegistrationForm>
                    <br>
                    <v-card-actions>
                      <v-btn flat color="primary" @click="changePage('login')">Sign in instead</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn @click="registerAccount" color="primary">Sign Up</v-btn>
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
  </div>
</template>

<script>
    import { register } from '../../lib/auth';
    import RegistrationForm from '../forms/RegistrationForm';
    export default {
      name: "RegistrationPage",
      components: {RegistrationForm},
      methods: {
        registerAccount() {
          let formData = this.$refs.registerForm.getFormData();
          console.log("Registering account with details: ", formData);
          if(formData !== null){
            register(formData.username, formData.password, {})
              .then((res) => {
                console.log('Registered account with response: ', res)
              })
              .catch((err) => { console.log("Error signing up: ", err); })
          }
        },
        changePage(relativeUrl) {
          this.$router.push(relativeUrl);
        }
      }
    }
</script>

<style scoped>

</style>
