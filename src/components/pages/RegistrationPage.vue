<template>
  <div>
    <v-container>
      <v-layout row class="text-xs-center">
        <v-flex xs0 sm2></v-flex>
        <v-flex xs12 sm8>
          <v-card flat>
            <v-layout>
              <v-flex xs1 md2 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
                <v-card :height="matchFormHeight"></v-card>
              </v-flex>
              <v-flex>
                <span ref="formContainer">
                  <v-container style="position: relative;top: 13%;" class="text-xs-center">
                    <v-card flat>
                      <v-card-title primary-title>
                        <h4>Account Registration</h4>
                      </v-card-title>
                      <v-alert :value="registerError" type="error">{{ registerErrorMessage }}</v-alert>
                      <RegistrationForm
                        ref="registerForm"
                      ></RegistrationForm>
                      <v-card-actions>
                        <v-btn flat color="primary" @click="changePage('login')">Sign in instead</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          @click="registerAccount"
                          color="primary"
                          :loading="sending"
                          :disabled="sending"
                        >Sign Up</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-container>
                </span>
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
    import { compileUserRegistrationMetadata } from '../../lib/authMetadata';

    export default {
      name: "RegistrationPage",
      components: {RegistrationForm},
      data() {
        return {
          registerError: false,
          registerErrorMessage: "",
          sending: false,
        }
      },
      computed: {
        // Gets the height for a particular component ref
        matchFormHeight(ref) {
          if(ref && ref.$refs && ref.$refs.formContainer && ref.$refs.formContainer.clientHeight) {
            return ref.$refs.formContainer.clientHeight;
          }
          console.info("Could not find the ref: ", ref);
          return "840px"
        }
      },
      methods: {
        registerAccount() {
          let formData = this.$refs.registerForm.getFormData();
          console.log("Registering account with details: ", formData);
          if(formData !== null){
            this.registerError = false;
            this.registerErrorMessage = "";
            this.$refs.registerForm.setSubmitState(true);
            this.sending = true;
            // register(
            //   formData.username,
            //   formData.password,
            //   compileUserRegistrationMetadata(formData)
            // ).then((res) => {
            //     console.log('Registered account with response: ', res);
            //     this.$refs.registerForm.setSubmitState(false);
            //     this.sending = false;
            //     this.$router.push('postregistration');
            //   })
            //   .catch((err) => {
            //     console.log("Error signing up: ", err);
            //     this.registerError = true;
            //     this.registerErrorMessage = err.json.msg;
            //     this.$refs.registerForm.setSubmitState(false);
            //     this.sending = false;
            //   })
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
