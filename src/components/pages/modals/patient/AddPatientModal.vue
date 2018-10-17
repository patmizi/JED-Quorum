<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-btn slot="activator" color="primary" @click="openModal">Add Patient</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Add Patient</span>
      </v-card-title>

      <v-card-text>
        <PatientForm ref="patientForm"></PatientForm>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" flat @click.native="dialog = false" :disabled="isSending">Close</v-btn>
        <v-btn color="secondary" flat @click.native="add" :loading="isSending">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex';
    import PatientForm from "../../../forms/PatientForm";
    import {
      ADD_PATIENT,
    } from '../../../../_store/actions.type';

    export default {
        name: "AddPatientModal",
        components: {
          PatientForm
        },
        data() {
          return {
            dialog: false,
          }
        },
        watch: {
          dialog (val) {
            if(this.$refs && this.$refs.patientForm && val === false) {
              this.$refs.patientForm.initForm();
            }
          }
        },
        methods: {
          add() {
            console.log('SAVING DATA...');
            if (this.$refs.patientForm.isFormValid()){
              this.$refs.patientForm.setSubmitState(true);
              this.$store.dispatch(ADD_PATIENT)
                .then(() => {
                  this.dialog = false;
                });
            }
          },
          openModal() {
            this.$refs.patientForm.initForm();
          },
        },
        computed: {
          ...mapGetters([
            'focusedPatientState',
            'isSending',
          ])
        }
    }
</script>

<style scoped>

</style>
