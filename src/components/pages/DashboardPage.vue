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
        <v-list-tile v-for="item in menuItems" :key="item.text" @click="renderMenuItem(item.component)">
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
            <keep-alive>
              <component v-bind:is="displayComponent"></component>
            </keep-alive>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    import { mapActions } from 'vuex'
    import DashboardDefault from './dashboardContent/DashboardDefault';
    import DashboardDoctorsRegistry from './dashboardContent/DashboardDoctorsRegistry';
    import DashboardPatientRegistry from './dashboardContent/DashboardPatientRegistry';

    export default {
        name: "DashboardPage",
        components: {
          DashboardDefault,
          DashboardDoctorsRegistry,
          DashboardPatientRegistry
        },
        computed: {
        },
        data() {
          return {
            drawer: false,
            displayComponent: DashboardDefault,
            menuItems: [
              { icon: 'dashboard', text: 'Dashboard', component: DashboardDefault },
              { icon: 'face', text: 'Doctor Registry', component: DashboardDoctorsRegistry },
              { icon: 'pregnant_woman', text: 'Patient Registry', component: DashboardPatientRegistry }
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
          },
          renderMenuItem(component) {
            if(component !== null && component !== undefined){
              this.displayComponent = component;
            }
          }
        },
        mounted(){
          console.log("STORE: ", this.$store.state.authentication);
        }
    }
</script>

<style scoped>

</style>
