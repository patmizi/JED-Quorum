<template>
    <v-form v-model="valid">
      <v-text-field
        v-model="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
      ></v-text-field>
      <v-btn @click="signUp">Register</v-btn>
    </v-form>
</template>

<script>
    import { register } from '../../lib/auth';
    export default {
        name: "RegistrationForm",
        data() {
          return {
            valid: false,
            rules: [],
            email: "",
            password: "",
            firstName: "",
            lastName: ""
          }
        },
        methods: {
          signUp: () => {
            console.log("Registering account with credentials: ", this.email, this.password);
            register(this.email, this.password, {})
              .then((res) => {
                console.log("Got user token! ", res);
              })
              .catch((err) => { console.log("There was an error when signing up: ", err); })
          }
        }
    }
</script>

<style scoped>

</style>
