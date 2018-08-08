<template>
  <v-container-fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <LoginPanel></LoginPanel>
      </v-flex>
    </v-layout>
  </v-container-fluid>
</template>

<script>
    import LoginPanel from '../LoginPanel';
    export default {
        name: "LoginContainer",
        components: {
          LoginPanel
        },
        data() {
          return {
          }
        }
    }
</script>

<style scoped>

</style>
