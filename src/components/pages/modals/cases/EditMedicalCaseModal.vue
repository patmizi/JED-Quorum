<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>Update Medical Case</v-card-title>

      <v-card-text>
        <MedicalCaseForm ref="medicalCaseForm"></MedicalCaseForm>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" flat @click.native="dialog = false" :disabled="sending">Close</v-btn>
        <v-btn color="secondary" flat @click.native="edit" :loading="sending">Update</v-btn>
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
    UPDATE_FOCUSED_CASE,
    FETCH_CASES,
  } from '../../../../_store/actions.type';
  import store from '../../../../_store';

  export default {
    name: "EditMedicalCaseModal",
    components: {MedicalCaseForm},
    watch: {
      dialog (val) {
        if(this.$refs && this.$refs.medicalCaseForm && val === false) {
          console.log('Reset form here...');
          this.sending = false;
          this.$refs.medicalCaseForm.initForm();
          store.dispatch(RESET_FOCUS_CASE);
          store.dispatch(FETCH_CASES);
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
      },
      edit() {
        console.log('SAVING DATA...');
        if (this.$refs.medicalCaseForm.isFormValid()){
          this.sending = true;
          this.$refs.medicalCaseForm.setSubmitState(true);
          console.log("Adding focusedMedicalCase: ", this.focusedMedicalCase);
          this.$store.dispatch(UPDATE_FOCUSED_CASE, this.focusedMedicalCase, this.focusedMedicalCase.Medical_Case_Id)
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
