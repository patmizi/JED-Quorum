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
            :disabled="isSending"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            flat
            @click.native="dialog = false"
            :disabled="isSending">Close</v-btn>
          <v-btn
            color="error"
            flat
            @click.native="deletePatient"
            :disabled="confirmationText !== 'DELETE'"
            :loading="isSending">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {
      DELETE_PATIENT,
      FETCH_PATIENTS,
    } from '../../../../_store/actions.type';

    export default {
        name: "DeletePatientConfirmationModal",
        data() {
          return {
            dialog: false,
            confirmationText: "",
          }
        },
        watch: {
          dialog (val) {
            if(val === false) {
              this.confirmationText = "";
              this.$store.dispatch(FETCH_PATIENTS);
            }
          }
        },
        methods: {
          deletePatient() {
            console.log('Deleting patient...', this.focusedPatient);
            this.$store.dispatch(DELETE_PATIENT)
              .then(() => {
                this.dialog = false;
              });
          },
          openModal() {
            this.dialog = true;
          }
        },
        computed: {
          ...mapGetters([
            'focusedPatientState',
            'isSending'
          ])
        }
    }
</script>

<style scoped>

</style>
