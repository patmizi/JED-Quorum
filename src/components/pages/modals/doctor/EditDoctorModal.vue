<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Doctor</span>
      </v-card-title>

      <v-card-text>
        <DoctorForm ref="doctorForm"></DoctorForm>
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
    import DoctorForm from "../../../forms/DoctorForm";

    export default {
        name: "EditDoctorModal",
        components: {
          DoctorForm
        },
        data() {
          return {
            dialog: false,
            sending: false,
          }
        },
        watch: {
          dialog (val) {
            if(this.$refs && this.$refs.doctorForm && val === false) {
              this.sending = false;
              this.$refs.doctorForm.initForm();
              this.$emit('closemodal');
            }
          }
        },
        methods: {
          edit() {
            console.log('SAVING DATA...');
            if (this.$refs.doctorForm.isFormValid()) {
              this.sending = true;
              this.$refs.doctorForm.setSubmitState(true);
              this.dialog = false;
            }
          },
          openModal() {
            this.dialog = true;
          },
        },
        computed: {
          ...mapGetters([
            'focusedDoctor'
          ])
        }
    }
</script>

<style scoped>

</style>
