<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Patient Details</span>
      </v-card-title>

      <v-card-text>
        <v-layout row fill-height>
          <v-flex s6 class="grid-col">
            <PatientForm ref="patientForm"></PatientForm>
          </v-flex>
          <v-flex s6 class="grid-col">
            <v-tabs v-model="activeTab">
              <v-tab :key="'1'" ripple>Medical Cases</v-tab>
              <v-tab :key="'2'" ripple>Appointment History</v-tab>
            </v-tabs>
            <v-tabs-items v-model="activeTab">
              <v-tab-item :key="'1'" :id="'tab-1'">
                <MedicalCaseList ref="medicalCaseList"></MedicalCaseList>
              </v-tab-item>
              <v-tab-item :key="'2'" :id="'tab-2'">
                <AppointmentHistory ref="appointmentHistory"></AppointmentHistory>
              </v-tab-item>
            </v-tabs-items>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" flat @click.native="dialog = false" :disabled="sending">Close</v-btn>
        <v-btn color="secondary" flat @click.native="edit" :loading="sending">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex';
    import PatientForm from "../../../forms/PatientForm";
    import MedicalCaseList from '../../../etc/MedicalCaseList';
    import AppointmentHistory from '../../../etc/AppointmentHistory';
    import {UPDATE_PATIENT, SUCCESS_ALERT, FETCH_CASES} from '../../../../_store/actions.type';
    export default {
        name: "EditPatientModal",
        components: {
          PatientForm,
          MedicalCaseList,
          AppointmentHistory,
        },
        data() {
          return {
            dialog: false,
            sending: false,
            activeTab: "1",
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
                  this.$store.dispatch(SUCCESS_ALERT, 'Edited Patient Information')
                })
            }
          },
          openModal() {
            this.dialog = true;
            this.$store.dispatch(FETCH_CASES);
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
  .grid-col {
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
