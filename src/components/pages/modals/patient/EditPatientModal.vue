<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Patient Details</span>
      </v-card-title>

      <v-card-text>
        <v-layout row fill-height>
          <v-flex s5>
            <PatientForm ref="patientForm"></PatientForm>
          </v-flex>
          <v-flex s7>
            <v-tabs v-model="activeTab">
              <v-tab ripple>Medical Cases</v-tab>
              <v-tab-item>
                <MedicalCaseForm red="medicalCaseForm"></MedicalCaseForm>
              </v-tab-item>
              <v-tab ripple>Appointment History</v-tab>
              <v-tab-item>
                <AppointmentHistory ref="appointmentHistory"></AppointmentHistory>
              </v-tab-item>
            </v-tabs>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" flat @click.native="dialog = false" :disabled="sending">Close</v-btn>
        <v-btn color="secondary" flat @click.native="edit" :loading="sending">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex';
    import PatientForm from "../../../forms/PatientForm";
    import MedicalCaseForm from '../../../forms/MedicalCaseForm';
    import AppointmentHistory from '../../../forms/AppointmentHistory';
    import {UPDATE_PATIENT} from '../../../../_store/actions.type';
    export default {
        name: "EditPatientModal",
        components: {
          PatientForm,
          MedicalCaseForm,
          AppointmentHistory,
        },
        data() {
          return {
            dialog: false,
            sending: false,
            activeTab: null,
          }
        },
        watch: {
          dialog (val) {
            if(this.$refs && this.$refs.patientForm && val === false) {
              this.sending = false;
              this.$refs.patientForm.initForm();
              this.$emit('closemodal');
            }
          }
        },
        methods: {
          edit() {
            console.log('SAVING DATA...');
            if (this.$refs.patientForm.isFormValid()) {
              this.sending = true;
              this.$refs.patientForm.setSubmitState(true);
              this.$store.dispatch(UPDATE_PATIENT, this.focusedPatient)
                .then(() => {
                  this.dialog = false;
                })
            }
          },
          openModal() {
            this.dialog = true;
          },
        },
        computed: {
          ...mapGetters([
            'focusedPatient'
          ])
        }
    }
</script>

<style scoped>

</style>
