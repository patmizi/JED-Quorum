<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="username"
      :rules="[rules.required, rules.validEmail]"
      prepend-icon="person"
      name="Username"
      label="Username"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="[rules.required]"
      prepend-icon="lock"
      :append-icon="showPassword ? 'visibility_off' : 'visibility'"
      :type="showPassword ? 'text' : 'password'"
      name="Password"
      label="Password"
      @click:append="showPassword = !showPassword"
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
                username: this.email,
                password: this.password
              };
            }
            return null;
          }
        },
    }
</script>

<style scoped>

</style>
