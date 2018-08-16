<template>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="firstName"
        label="First Name"
        :rules="[rules.required]"
        validate-on-blur
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        label="Last Name"
        :rules="[rules.required]"
        validate-on-blur
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="E-mail"
        :rules="[rules.required, rules.validEmail]"
        validate-on-blur
      ></v-text-field>
      <v-text-field
        ref="password1field"
        v-model="password"
        :append-icon="showPassword1 ? 'visibility_off' : 'visibility'"
        label="Password"
        :type="showPassword1 ? 'text' : 'password'"
        :rules="[rules.required, rules.min, rules.matchingPasswords]"
        @click:append="showPassword1 = !showPassword1"
        v-on:blur="triggerPasswordValidation(true)"
        validate-on-blur
      ></v-text-field>
      <v-text-field
        ref="password2field"
        v-model="password2"
        label="Confirm Password"
        :append-icon="showPassword2 ? 'visibility_off' : 'visibility'"
        :type="showPassword2 ? 'text' : 'password'"
        :rules="[rules.matchingPasswords]"
        @click:append="showPassword2 = !showPassword2"
        v-on:blur="triggerPasswordValidation(false)"
        validate-on-blur
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
              validEmail: e => this.emailRegex.test(e) || 'Please enter a valid email address',
              matchingPasswords: () => {
                if (this.password.length <= 0 || this.password2.length <= 0) return true;
                return this.password === this.password2 || 'Passwords don\'t match';
              }
            }
          }
        },
        methods: {
          getFormData() {
            this.$refs.form.validate();
            if(this.valid){
              return {
                username: this.email,
                password: this.password,
                firstName: this.firstName,
                lastName: this.lastName
              };
            }
            return null;
          },
          triggerPasswordValidation(trigger2) {
              if(trigger2) this.$refs.password2field.validate();
              else this.$refs.password1field.validate();
          },
        }
    }
</script>

<style scoped>

</style>
