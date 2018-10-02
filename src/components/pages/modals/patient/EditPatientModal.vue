<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Patient</span>
      </v-card-title>

      <v-card-text>
        PLACEHOLDER
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" flat @click.native="close">Close</v-btn>
        <v-btn color="secondary" flat @click.native="save">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
        name: "EditPatientModal",
        data() {
          return {
            dialog: false,
          }
        },
        methods: {
          openModal(patientId) {
            console.log("OPENING MODAL WITH ID: ", patientId);
            this.dialog = true;
          },
          close() {
            console.log('CLOSING MODAL...');
            this.dialog = false;
          },
          save() {
            console.log('SAVING DATA...');
            this.close();
          }
        }
    }
</script>

<style scoped>

</style>
