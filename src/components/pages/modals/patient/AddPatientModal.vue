<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn slot="activator" color="primary">Add Patient</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Add Patient</span>
      </v-card-title>

      <v-card-text>
        <PatientForm ref="patientForm"></PatientForm>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" flat @click.native="dialog = false" :disabled="sending">Close</v-btn>
        <v-btn color="secondary" flat @click.native="save" :loading="sending">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    import PatientForm from "../../../forms/PatientForm";

    export default {
        name: "AddPatientModal",
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
              this.sending = val;
              this.$refs.patientForm.initForm();
            }
          }
        },
        methods: {
          save() {
            console.log('SAVING DATA...');
            let data = this.$refs.patientForm.getFormData();
            if(data !== null) {
              this.sending = true;
              this.$refs.patientForm.setSubmitState(true);
              // Exec action dispatcher
              // Wait for API response
              // Mutate State
              // Emit a request to update parent view
              this.dialog = false; // Close dialog after everything is done
            }
          }
        }
    }
</script>

<style scoped>

</style>
