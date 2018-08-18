<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="username"
      prepend-icon="person"
      name="Username"
      label="Username"
    ></v-text-field>
    <v-text-field
      v-model="password"
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
    export default {
        name: "LoginForm",
        data() {
          return {
            showPassword: false,
            username: "",
            password: "",
            valid: false,
            rules: {
              required: value => !!value || 'Required.'
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
