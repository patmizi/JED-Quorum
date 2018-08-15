<template>
    <v-form v-model="valid">
      <v-text-field
        v-model="firstName"
        label="First Name"
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        label="Last Name"
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="E-mail"
        :rules="[rules.required, rules.validEmail]"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="showPassword1 ? 'visibility_off' : 'visibility'"
        label="Password"
        :type="showPassword1 ? 'text' : 'password'"
        :rules="[rules.required, rules.min]"
        @click:append="showPassword1 = !showPassword1"
      ></v-text-field>
      <v-text-field
        v-model="password2"
        label="Confirm Password"
        :append-icon="showPassword2 ? 'visibility_off' : 'visibility'"
        :type="showPassword2 ? 'text' : 'password'"
        @click:append="showPassword2 = !showPassword2"
      ></v-text-field>
  </v-form>
</template>

<script>
    export default {
      name: "RegistrationForm",
      data() {
          return {
            valid: false,
            email: "",
            password: "",
            password2: "",
            firstName: "",
            lastName: "",
            showPassword1: false,
            showPassword2: false,
            emailRegex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            rules: {
              required: value => !!value || 'Required.',
              min: v => v.length >= 8 || 'Min 8 characters',
              validEmail: e => this.emailRegex.test(e) || 'Please enter a valid email address'
            }
          }
        },
        methods: {
          getFormData() {
            return {
              username: this.email,
              password: this.password,
              firstName: this.firstName,
              lastName: this.lastName
            };
          }
        }
    }
</script>

<style scoped>

</style>
