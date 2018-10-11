<template>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Delete Confirmation</span>
        </v-card-title>

        <v-card-text>
          Type <b class="error--text">DELETE</b> to confirm the deletion. This action is irreversible.
          <v-text-field
            placeholder="Type DELETE to confirm"
            v-model="confirmationText"
            :disabled="sending"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            flat
            @click.native="dialog = false"
            :disabled="sending">Close</v-btn>
          <v-btn
            color="error"
            flat
            @click.native="deletePatient"
            :disabled="confirmationText !== 'DELETE'"
            :loading="sending">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {
      DELETE_PATIENT,
      RESET_FOCUS_PATIENT,
      FETCH_PATIENTS,
      SUCCESS_ALERT,
    } from '../../../../_store/actions.type';

    export default {
        name: "DeletePatientConfirmationModal",
        data() {
          return {
            dialog: false,
            sending: false,
            confirmationText: "",
          }
        },
        watch: {
          dialog (val) {
            if(val === false) {
              this.sending = val;
              this.confirmationText = "";
              this.$store.dispatch(RESET_FOCUS_PATIENT);
            }
          }
        },
        methods: {
          deletePatient() {
            console.log('Deleting patient...', this.focusedPatient);
            this.sending = true;
            this.$store.dispatch(DELETE_PATIENT, this.focusedPatient.Patient_Id)
              .then((res) => {
                console.log('Deleted patient response: ', res);
                this.dialog = false;
                this.$store.dispatch(FETCH_PATIENTS);
                this.$store.dispatch(SUCCESS_ALERT, 'Deleted Patient');
              });
          },
          openModal() {
            this.dialog = true;
          }
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
