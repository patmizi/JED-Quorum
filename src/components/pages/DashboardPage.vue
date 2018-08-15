<template>
  <div>
    <h1>Hi!</h1>
    <p>You're logged in!</p>
    <p>
      <router-link to="/login">Logout</router-link>
    </p>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "DashboardPage",
        computed: {
        },
        methods: {
        },
        mounted(){
          console.log("STORE: ", this.$store.state.authentication);
        }
    }
</script>

<style scoped>

</style>
