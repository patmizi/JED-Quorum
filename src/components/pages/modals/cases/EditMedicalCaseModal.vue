<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>Update Medical Case</v-card-title>

      <v-card-text>
        <MedicalCaseForm ref="medicalCaseForm"></MedicalCaseForm>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" flat @click.native="dialog = false" :disabled="isSending">Close</v-btn>
        <v-btn color="secondary" flat @click.native="edit" :loading="isSending">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapGetters} from 'vuex';
  import MedicalCaseForm from '../../../forms/MedicalCaseForm';
  import {
    UPDATE_CASE,
    SET_FOCUS_CASE,
  } from '../../../../_store/actions.type';

  export default {
    name: "EditMedicalCaseModal",
    components: {MedicalCaseForm},
    watch: {
      dialog (val) {
        if(this.$refs && this.$refs.medicalCaseForm && val === false) {
          console.log('Reset form here...');
          // this.$refs.medicalCaseForm.initForm();
          this.$store.dispatch(SET_FOCUS_CASE, null);
        }
      }
    },
    data() {
      return {
        dialog: false,
      }
    },
    methods: {
      openModal() {
        this.dialog = true;
      },
      edit() {
        console.log('SAVING DATA...');
        if (this.$refs.medicalCaseForm.isFormValid()){
          this.sending = true;
          console.log("Adding focusedMedicalCase: ", this.focusedMedicalCaseState);
          console.log("This is the focused patient state: ", this.focusedPatientState);
          this.$store.dispatch(UPDATE_CASE)
            .then(() => {
              this.dialog = false;
            });
        }
      }
    },
    computed: {
      ...mapGetters([
        'focusedMedicalCaseState',
        'focusedPatientState',
        'isSending',
      ])
    }
  }
</script>

<style scoped>

</style>
