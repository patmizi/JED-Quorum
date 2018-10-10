<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      ref="usernameField"
      v-model="username"
      :rules="[rules.required, rules.validEmail]"
      :disabled="sending"
      prepend-icon="person"
      name="Username"
      label="Username"
      :validate-on-blur="true"
    ></v-text-field>
    <v-text-field
      ref="passwordField"
      v-model="password"
      :rules="[rules.required]"
      :disabled="sending"
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
  import {emailRegex} from "../../lib/helpers/constants";

  export default {
    name: "LoginForm",
    data() {
      return {
        showPassword: false,
        username: "",
        password: "",
        valid: false,
        sending: false,
        rules: {
          required: value => !!value || 'Required.',
          validEmail: e => emailRegex.test(e) || 'Please enter a valid email address'
        }
      }
    },
    methods: {
      getFormValue() {
        this.$refs.form.validate();
        if (this.valid) {
          return {
            username: this.username,
            password: this.password
          };
        }
        return null;
      },
      failLogin() {
        this.valid = false;
        this.$nextTick(function () {
          this.$refs.usernameField.error = true;
          this.$refs.passwordField.error = true;
        });
      },
      /**
       * Sets the sending state to true or false
       * @param state {Boolean}
       */
      setSubmitState(state) {
        this.sending = state;
      }
    },
  }
</script>

<style scoped>

</style>
