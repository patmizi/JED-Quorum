<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Patient</span>
      </v-card-title>

      <v-card-text>
        <PatientForm ref="patientForm"></PatientForm>
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
    import {UPDATE_PATIENT} from '../../../../_store/actions.type';

    export default {
        name: "EditPatientModal",
        components: {
          PatientForm
        },
        data() {
          return {
            dialog: false,
            sending: false,
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
