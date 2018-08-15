<template>
    <div>
      <RegistrationForm
        ref="registerForm"
      ></RegistrationForm>
      <v-btn @click="registerAccount">Register</v-btn>
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
          // register(formData.username, formData.password, {})
          //   .then((res) => {
          //     console.log('Registered account with response: ', res)
          //   })
          //   .catch((err) => { console.log("Error signing up: ", err); })
        }
      }
    }
</script>

<style scoped>

</style>
