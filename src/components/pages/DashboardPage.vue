<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="mini"
      v-model="drawer"
      hide-overlay
      stateless
      app
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{profTitle}}{{fullName}}</v-list-tile-title>
              <v-list-tile-sub-title>Glebe Orthodontics</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                icon
                @click.stop="mini = !mini"
              >
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense class="pt-0">
        <v-subheader>Admin</v-subheader>
        <!--menu items below-->
        <v-list-tile
          v-for="(item, index) in menuItems"
          :key="item.text"
          @click="handleMenuClick(item.component, index)"
          :disabled="item.selected"
        >
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-subheader>System</v-subheader>
        <v-list-tile @click="handleOpenModal('settingsModal')">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="handleLogOut">
          <v-list-tile-action>
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
      class="elevation-0"
    >
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex>
            <keep-alive>
              <component v-bind:is="displayComponent"></component>
            </keep-alive>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <user-settings-modal
      ref="settingsModal"
    ></user-settings-modal>
  </v-app>
</template>

<script>
    import { mapActions } from 'vuex';
    import DashboardDefault from './dashboardContent/DashboardDefault';
    import DashboardDoctorsRegistry from './dashboardContent/DashboardDoctorsRegistry';
    import DashboardPatientRegistry from './dashboardContent/DashboardPatientRegistry';
    import UserSettingsModal from './modals/UserSettingsModal';

    export default {
        name: "DashboardPage",
        components: {
          DashboardDefault,
          DashboardDoctorsRegistry,
          DashboardPatientRegistry,
          'user-settings-modal': UserSettingsModal,
        },
        computed: {
          fullName: function() {
            if(this.$store.state.authentication && this.$store.state.authentication.user && this.$store.state.authentication.user){
              return this.$store.state.authentication.user.Full_Name;
            }
            return "User";
          },
          profTitle: function() {
            if(this.$store.state.authentication.user && this.$store.state.authentication.user && this.$store.state.authentication.user.Business_Role === "doctor"){
              return "Dr. ";
            }
            return "";
          }
        },
        data() {
          return {
            drawer: true,
            mini: false,
            displayComponent: DashboardDefault,
            menuItems: [
              { icon: 'dashboard', text: 'Dashboard', component: DashboardDefault, selected: true },
              { icon: 'local_hospital', text: 'Doctor Registry', component: DashboardDoctorsRegistry, selected: false },
              { icon: 'people', text: 'Patient Registry', component: DashboardPatientRegistry, selected: false }
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
          handleMenuClick(component, menuIndex) {
            console.log("index clicked: ", menuIndex);
            for(let i=0; i < this.menuItems.length; i++){
              this.menuItems[i].selected = i === menuIndex;
            }
            if(component !== null && component !== undefined){
              this.displayComponent = component;
            }
          },
          handleOpenModal(modalName) {
            this.$refs[modalName].openModal();
          },
        },
        mounted(){
          console.log("STORE: ", this.$store.state.authentication);
          console.log("STORE FULL: ", this.$store);
        }
    }
</script>

<style scoped>

</style>
