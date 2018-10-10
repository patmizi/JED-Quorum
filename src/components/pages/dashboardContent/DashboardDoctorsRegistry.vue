<template>
    <div>
      <v-toolbar flat>
        <v-toolbar-title>Doctor Registry</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
         <AddDoctorModal ref="addDoctorModal" v-on:closemodal="initialize"></AddDoctorModal>
        <!--<v-btn @click="initialize">REFRESH</v-btn>-->
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="doctors"
        :loading="loading"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left"><b>{{ props.item.Doctor_Id }}</b></td>
          <td class="text-xs-left">{{ props.item.First_Name }}</td>
          <td class="text-xs-left">{{ props.item.Last_Name }}</td>
          <td class="text-xs-left">{{ props.item.Contact_Number }}</td>
          <td class="layout">
            <v-icon
              small
              class="mr-2"
              @click="editDoctor(props.item)"
            >edit</v-icon>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="initialize">Refresh</v-btn>
        </template>
      </v-data-table>
      <EditDoctorModal ref="editDoctorModal" v-on:closemodal="initialize"></EditDoctorModal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import AddDoctorModal from '../modals/doctor/AddDoctorModal';
    import EditDoctorModal from '../modals/doctor/EditDoctorModal';
    import { FETCH_DOCTORS, STATE_RESET, SET_FOCUS_DOCTOR, RESET_FOCUS_DOCTOR } from '../../../_store/actions.type';
    import store from '../../../_store';

    export default {
      name: "DashboardDoctorsRegistry",
      components: {
        AddDoctorModal,
        EditDoctorModal
      },
      data() {
        return {
          dialog: false,
          headers: [
            { text: 'Doctor ID',  align: 'left', sortable: true, value: 'Doctor_Id' },
            { text: 'First Name', sortable: true, value: 'First_Name'},
            { text: 'Last Name', sortable: true, value: 'Last_Name' },
            { text: 'Contact Number', sortable: false, value: 'Contact_Number' },
            { text: 'Actions', value: 'Doctor_Id' }
          ],
          editedIndex: -1,
          loading: false
        }
      },
      created() {
          store.dispatch(STATE_RESET)
            .then(() => {
              this.initialize()
            });
      },
      methods: {
        initialize() {
          this.loading = true;
          console.log("Initializing");
          Promise.all([
            store.dispatch(FETCH_DOCTORS)
          ]).then(() => {
            console.log("All actions have been finished...;");
            this.loading = false;
          })
        },
        editDoctor(doctor) {
          console.log("EDIT DOCTOR: ", doctor);
          store.dispatch(RESET_FOCUS_DOCTOR);
          if(this.$refs && this.$refs.editDoctorModal && doctor.Doctor_Id){
            store.dispatch(SET_FOCUS_DOCTOR, doctor)
              .then(() => {
                this.$refs.editDoctorModal.openModal();
              });
          }else {
            console.error("Something went wrong. Horrible wrong... ", doctor);
          }
        }
      },
      computed: {
        ...mapGetters([
          'doctors',
        ])
      }
    }
</script>

<style scoped>

</style>
