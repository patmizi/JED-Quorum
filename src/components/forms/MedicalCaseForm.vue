<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="focusedMedicalCaseState.Medical_Case_Name"
      label="Case Name"
      :rules="[rules.required]"
      :disabled="isSending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      label="Patient Name"
      :placeholder="patientFullName"
      disabled
    ></v-text-field>
    <v-select
      v-model="focusedMedicalCaseState.doctors"
      :items="doctors"
      item-text="First_Name"
      attach
      chips
      label="Attached Doctors"
      multiple
      deletable-chips
      return-object
    ></v-select>
    <v-textarea
      v-model="focusedMedicalCaseState.Medical_Case_Description"
      label="Case notes go here"
      :disabled="isSending"
      :rules="[rules.required]"
    ></v-textarea>
  </v-form>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
      name: "MedicalCaseForm",
      data() {
          return {
            rules: {
              required: value => !!value || 'Required.',
            },
            valid: false,
          }
        },
        methods: {
          isFormValid() {
            this.$refs.form.validate();
            return this.valid;
          },
          initForm() {
            this.valid = false;
            this.$refs.form.reset();
          },
          /**
           * Sets the sending state to true or false
           * @param state {Boolean}
           */
          setSubmitState(state) {
            console.log('deprecated');
          }
        },
        computed: {
          ...mapGetters([
            'focusedMedicalCaseState',
            'focusedPatientState',
            'doctors',
            'isSending',
          ]),
          patientFullName: function() {
            console.log('focused patient in compute: ', this.focusedPatientState);
            return this.focusedPatientState.First_Name + ' ' + this.focusedPatientState.Last_Name
          },
        },
    }
</script>

<style scoped>

</style>
