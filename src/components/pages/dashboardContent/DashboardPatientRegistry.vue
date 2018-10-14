<template>
    <div>
      <delete-confirmation-modal ref="deletePatientModal"></delete-confirmation-modal>
      <v-toolbar flat>
        <v-toolbar-title>Patient Registry</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <AddPatientModal ref="addPatientModal" v-on:closemodal="initialize"></AddPatientModal>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="patientList"
        :loading="isSending"
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
      <EditPatientModal ref="editPatientModal" v-on:closemodal="initialize"></EditPatientModal>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import { FETCH_PATIENTS, SET_FOCUS_PATIENT } from '../../../_store/actions.type';
    import store from '../../../_store';

    import EditPatientModal from '../modals/patient/EditPatientModal';
    import AddPatientModal from '../modals/patient/AddPatientModal';
    import DeletePatientConfirmationModal from '../modals/patient/DeletePatientConfirmationModal';

    export default {
      name: "DashboardPatientRegistry",
      components: {
        EditPatientModal,
        AddPatientModal,
        'delete-confirmation-modal': DeletePatientConfirmationModal,
      },
      data() {
        return {
          headers: [
            { text: 'Patient ID',  align: 'left', sortable: true, value: 'Patient_Id' },
            { text: 'First Name', sortable: true, value: 'First_Name'},
            { text: 'Last Name', sortable: true, value: 'Last_Name' },
            { text: 'Contact Number', sortable: false, value: 'Contact_Number' },
            { text: 'Actions', value: 'Patient_Id' }
          ],
          editedIndex: -1,
        }
      },
      created() {
          this.initialize();
      },
      methods: {
        initialize() {
          console.log("Initializing");
          Promise.all([
            store.dispatch(FETCH_PATIENTS)
          ]).then(() => {
            console.log("All actions have been finished...;");
          })
        },
        editPatient(patient) {
          console.log("EDIT PATIENT: ", patient);
          if(this.$refs && this.$refs.editPatientModal && patient.Patient_Id){
            console.log('setting the focus patient: ', patient.Patient_Id);
            store.dispatch(SET_FOCUS_PATIENT, patient.Patient_Id)
              .then(() => {
                this.$refs.editPatientModal.openModal();
              });
          }else {
            console.error("Something went wrong. Horrible wrong... ", patient);
          }
        },
        deletePatient(patient) {
          store.dispatch(SET_FOCUS_PATIENT, patient.Patient_Id)
            .then(() => {
              this.$refs.deletePatientModal.openModal();
            });
        },
      },
      computed: {
        ...mapGetters([
          'patientList',
          'isSending'
        ])
      }
    }
</script>

<style scoped>

</style>
