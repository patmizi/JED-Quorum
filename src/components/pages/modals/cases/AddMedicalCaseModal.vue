<template>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>Add Medical Case</v-card-title>

        <v-card-text>
          <MedicalCaseForm ref="medicalCaseForm"></MedicalCaseForm>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat @click.native="dialog = false" :disabled="sending">Close</v-btn>
          <v-btn color="secondary" flat @click.native="edit" :loading="sending">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex';
    import MedicalCaseForm from '../../../forms/MedicalCaseForm';
    import {
      RESET_FOCUS_CASE,
      SUCCESS_ALERT,
      ADD_CASE,
    } from '../../../../_store/actions.type';

    export default {
      name: "AddMedicalCaseModal",
      components: {MedicalCaseForm},
      watch: {
          dialog (val) {
            if(this.$refs && this.$refs.patientForm && val === false) {
              this.sending = false;
              this.$refs.medicalCaseForm.initForm();
              this.$emit('closemodal');
            }
          }
        },
        data() {
          return {
            dialog: false,
            sending: false,
          }
        },
        methods: {
          openModal() {
            this.dialog = true;
            this.$store.dispatch(RESET_FOCUS_CASE);
            this.$refs.medicalCaseForm.initForm();
          },
          add() {
            console.log('SAVING DATA...');
            if (this.$refs.medicalCaseForm.isFormValid()){
              this.sending = true;
              this.$refs.medicalCaseForm.setSubmitState(true);
              console.log("Adding focusedMedicalCase: ", this.focusedMedicalCase);
              this.$store.dispatch(ADD_CASE, this.focusedMedicalCase)
                .then(() => {
                  this.dialog = false;
                  this.$store.dispatch(SUCCESS_ALERT, 'Added Patient')
                });
            }
          }
        },
        computed: {
          ...mapGetters([
            'focusedMedicalCase'
          ])
        }
    }
</script>

<style scoped>

</style>
