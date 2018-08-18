<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      ref="usernameField"
      v-model="username"
      :rules="[rules.required, rules.validEmail]"
      prepend-icon="person"
      name="Username"
      label="Username"
      :validate-on-blur="true"
    ></v-text-field>
    <v-text-field
      ref="passwordField"
      v-model="password"
      :rules="[rules.required]"
      prepend-icon="lock"
      :append-icon="showPassword ? 'visibility_off' : 'visibility'"
      :type="showPassword ? 'text' : 'password'"
      name="Password"
      label="Password"
      @click:append="showPassword = !showPassword"
      :validate-on-blur="true"
    ></v-text-field>
  </v-form>
</template>

<script>
    import { emailRegex } from "../../lib/helpers/constants";

    export default {
        name: "LoginForm",
        data() {
          return {
            showPassword: false,
            username: "",
            password: "",
            valid: false,
            rules: {
              required: value => !!value || 'Required.',
              validEmail: e => emailRegex.test(e) || 'Please enter a valid email address'
            }
          }
        },
        methods:{
          getFormValue() {
            this.$refs.form.validate();
            if(this.valid){
              return {
                username: this.username,
                password: this.password
              };
            }
            return null;
          },
          failLogin() {
            this.valid = false;
            this.$nextTick(function() {
              this.$refs.usernameField.error = true;
              this.$refs.passwordField.error = true;
            });
          }
        },
    }
</script>

<style scoped>

</style>
