<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Dr. Benjamin Franklin</v-list-tile-title>
              <v-list-tile-sub-title>Glebe Orthodontics</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense class="pt-0">
        <!--menu items below-->
        <v-list-tile v-for="item in menuItems" :key="item.text" @click="">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
      class="elevation-0"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-list-tile>
        <v-btn @click="handleLogOut" flat>
          Log Out
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-list-tile>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            PLACEHOLDER_TEXT
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "DashboardPage",
        computed: {
        },
        data() {
          return {
            drawer: true,
            menuItems: [
              { icon: 'dashboard', text: 'Dashboard' },
              { icon: 'face', text: 'Doctor Registry' },
              { icon: 'pregnant_woman', text: 'Patient Registry' }
            ]
          }
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
  .avatar-container {
    /*margin-top: 15px;*/
    /*margin-bottom: 15px;*/
  }
</style>
