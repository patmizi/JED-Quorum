<template>
    <div>
      <v-toolbar flat>
        <v-toolbar-title>Patient Registry</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <AddPatientModal ref="addPatientModal"></AddPatientModal>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="patients"
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
    import EditPatientModal from '../modals/patient/EditPatientModal';
    import AddPatientModal from '../modals/patient/AddPatientModal';
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
          patients: [],
          editedIndex: -1
        }
      },
      created() {
          this.initialize()
      },
      methods: {
        initialize() {
          console.log("Initializing");
          this.patients = [{
            "AddressId": 3,
            "Contact_Number": "0400000000",
            "Date_Of_Birth": "12/01/1993",
            "Email": "kullen.hatim.patient@lcelandic.com",
            "First_Name": "Test",
            "Gender": "M",
            "Last_Name": "Test",
            "Patient_Id": 1,
            "address": {
              "AddressId": 3,
              "Country": "United States",
              "Postcode": 10013,
              "State": "NY",
              "Street": "17 Greenwich St",
              "Suburb": "",
              "Unit": ""
            }
          }]
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
      }
    }
</script>

<style scoped>

</style>
