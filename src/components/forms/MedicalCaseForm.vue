<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="medicalCaseName"
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
      v-model="attachedDoctors"
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
      v-model="medicalCaseDescription"
      label="Case notes go here"
      :disabled="sending"
      :rules="[rules.required]"
    ></v-textarea>
  </v-form>
</template>

<script>
    import {mapGetters} from 'vuex';
    import store from '../../_store';
    import {
      RESET_FOCUS_CASE,
      SET_FOCUSED_PATIENT_CASE,
      SET_FOCUS_CASE,
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
            medicalCaseName: "",
            medicalCaseDescription: "",
            attachedDoctors: [],
          }
        },
        methods: {
          isFormValid() {
            this.$refs.form.validate();
            return this.valid;
          },
          initForm() {
            this.valid = false;
            this.sending = false;
            this.resetFields();
            store.dispatch(RESET_FOCUS_CASE);
            store.dispatch(SET_FOCUSED_PATIENT_CASE, this.focusedPatient.Patient_Id)
              .then(() => {
                this.medicalCaseName = this.focusedMedicalCase.Medical_Case_Name;
                this.medicalCaseDescription = this.focusedMedicalCase.Medical_Case_Description;
                this.attachedDoctors = this.focusedMedicalCase.doctors;
              });
            this.$refs.form.reset();
          },
          resetFields() {
            this.medicalCaseName = "";
            this.medicalCaseDescription = "";
            this.attachedDoctors = [];
          },
          /**
           * Sets the sending state to true or false
           * @param state {Boolean}
           */
          setSubmitState(state) {
            this.sending = state;
            if(state === true){
              let push = {
                Medical_Case_Id: this.focusedMedicalCase.Medical_Case_Id,
                Patient_Id: this.focusedPatient.Patient_Id,
                Medical_Case_Name: this.medicalCaseName,
                Medical_Case_Description: this.medicalCaseDescription,
                doctors: this.doctors,
              };
              store.dispatch(SET_FOCUS_CASE, push);
            }
          }
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
