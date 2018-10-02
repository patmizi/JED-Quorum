<template>
    <div>
      <v-toolbar flat>
        <v-toolbar-title>Patient Registry</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <AddPatientModal ref="addPatientModal"></AddPatientModal>
        <!--<v-btn @click="initialize">REFRESH</v-btn>-->
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="patients"
        :loading="loading"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left"><b>{{ props.item.Patient_Id }}</b></td>
          <td class="text-xs-left">{{ props.item.First_Name }}</td>
          <td class="text-xs-left">{{ props.item.Last_Name }}</td>
          <td class="text-xs-left">{{ props.item.Contact_Number }}</td>
          <td class="layout">
            <v-icon
              small
              class="mr-2"
              @click="editPatient(props.item)"
            >edit</v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deletePatient(props.item)"
            >delete</v-icon>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="initialize">Refresh</v-btn>
        </template>
      </v-data-table>
      <EditPatientModal ref="editPatientModal"></EditPatientModal>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import EditPatientModal from '../modals/patient/EditPatientModal';
    import AddPatientModal from '../modals/patient/AddPatientModal';
    import { FETCH_PATIENTS } from '../../../_store/actions.type';
    import store from '../../../_store';

    export default {
      name: "DashboardPatientRegistry",
      components: {
        EditPatientModal,
        AddPatientModal
      },
      data() {
        return {
          dialog: false,
          headers: [
            { text: 'Patient ID',  align: 'left', sortable: true, value: 'Patient_Id' },
            { text: 'First Name', sortable: true, value: 'First_Name'},
            { text: 'Last Name', sortable: true, value: 'Last_Name' },
            { text: 'Contact Number', sortable: false, value: 'Contact_Number' },
            { text: 'Actions', value: 'Patient_Id' }
          ],
          editedIndex: -1,
          loading: false
        }
      },
      created() {
          this.initialize()
      },
      methods: {
        initialize() {
          this.loading = true;
          console.log("Initializing");
          Promise.all([
            store.dispatch(FETCH_PATIENTS)
          ]).then(() => {
            console.log("All actions have been finished...;");
            this.loading = false;
          })
        },
        editPatient(patient) {
          console.log("EDIT PATIENT: ", patient);
          if(this.$refs && this.$refs.editPatientModal && patient.Patient_Id){
            this.$refs.editPatientModal.openModal(patient.Patient_Id);
            return;
          }
          console.error("Something went wrong with editPatient: ", patient);
        },
        deletePatient(patient) {
          console.log("DELETE PATIENT: ", patient)
        }
      },
      computed: {
        ...mapGetters([
          'patients',
        ])
      }
    }
</script>

<style scoped>

</style>
