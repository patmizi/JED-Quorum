<template>
  <div>
    <h1>Hi!</h1>
    <p>You're logged in!</p>
    <p>
      <v-btn @click="handleLogOut">Logout</v-btn>
    </p>
  </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "DashboardPage",
        computed: {
        },
        methods: {
          ...mapActions('authentication', ['logout']),
          handleLogOut() {
            this.$store.dispatch('authentication/logout')
              .catch((err) => {
                console.log("an error has occured: ", err);
              })
          }
        },
        mounted(){
          console.log("STORE: ", this.$store.state.authentication);
        }
    }
</script>

<style scoped>

</style>
