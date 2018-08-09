<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs4>
        <LoginForm></LoginForm>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import LoginForm from '../forms/LoginForm';
    export default {
        name: "LoginPage",
        components: {
          LoginForm
        },
        data() {
          return {
          }
        }
    }
</script>

<style scoped>

</style>
