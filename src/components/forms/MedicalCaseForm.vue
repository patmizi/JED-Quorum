<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="focusedMedicalCase.Medical_Case_Name"
      label="Case Name"
      :rules="[rules.required]"
      :disabled="sending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      label="Patient Name"
      :placeholder="patientFullName"
      disabled
    ></v-text-field>
    <v-select
      v-model="focusedMedicalCase.doctors"
      :items="doctors"
      item-text="First_Name"
      attach
      chips
      label="Attached Doctors"
      multiple
      deletable-chips
    ></v-select>
    <v-textarea
      v-model="focusedMedicalCase.Medical_Case_Description"
      label="Case notes go here"
      :disabled="sending"
    ></v-textarea>
  </v-form>
</template>

<script>
    import {mapGetters} from 'vuex';
    import store from '../../_store';
    import {
      RESET_FOCUS_CASE
    } from '../../_store/actions.type';

    export default {
      name: "MedicalCaseForm",
      data() {
          return {
            rules: {
              required: value => !!value || 'Required.',
            },
            valid: false,
            sending: false,
          }
        },
        methods: {
          isFormValid() {
            this.$refs.form.validate();
            console.log("FOCUSED MEDICAL CASE STATE: ", this.focusedMedicalCase);
            return this.valid;
          },
          initForm() {
            this.valid = false;
            this.sending = false;
            store.dispatch(RESET_FOCUS_CASE);
            this.$refs.form.reset();
          },
        },
        computed: {
          ...mapGetters([
            'focusedMedicalCase',
            'focusedPatient',
            'doctors',
          ]),
          patientFullName: function() {
            console.log('focused patient in compute: ', this.focusedPatient);
            return this.focusedPatient.First_Name + ' ' + this.focusedPatient.Last_Name
          },
        },
    }
</script>

<style scoped>

</style>
