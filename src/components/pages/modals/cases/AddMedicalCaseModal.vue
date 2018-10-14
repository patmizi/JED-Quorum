<template>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>Add Medical Case</v-card-title>

        <v-card-text>
          <MedicalCaseForm ref="medicalCaseForm"></MedicalCaseForm>
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
    import MedicalCaseForm from '../../../forms/MedicalCaseForm';
    import {
      ADD_CASE,
      SET_FOCUS_CASE,
    } from '../../../../_store/actions.type';
    import store from '../../../../_store';

    export default {
      name: "AddMedicalCaseModal",
      components: {MedicalCaseForm},
      watch: {
          dialog (val) {
            if(this.$refs && this.$refs.medicalCaseForm && val === false) {
              // this.$refs.medicalCaseForm.initForm();
              store.dispatch(SET_FOCUS_CASE, null); // This will reset the focused case just in case
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
            this.$refs.medicalCaseForm.initForm();
          },
          add() {
            console.log('SAVING DATA...');
            if (this.$refs.medicalCaseForm.isFormValid()){
              console.log("Adding focusedMedicalCase: ", this.focusedMedicalCaseState);
              this.$store.dispatch(ADD_CASE)
                .then(() => {
                  this.dialog = false;
                });
            }
          }
        },
        computed: {
          ...mapGetters([
            'focusedMedicalCaseState',
            'isSending'
          ])
        }
    }
</script>

<style scoped>

</style>
