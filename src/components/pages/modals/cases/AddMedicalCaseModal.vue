<template>
    <v-dialog>
      <v-card>
        <v-card-title>Add Medical Case</v-card-title>

        <v-card-text>
          PLACEHOLDER TEXT WILL BE PUT HERE
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
    export default {
        name: "AddMedicalCaseModal",
        watch: {
          dialog (val) {
            if(this.$refs && this.$refs.patientForm && val === false) {
              this.sending = false;
              this.$refs.patientForm.initForm();
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
