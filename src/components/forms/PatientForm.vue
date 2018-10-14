<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="focusedPatientState.First_Name"
      label="First Name"
      :rules="[rules.required]"
      :disabled="isSending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      v-model="focusedPatientState.Last_Name"
      label="Last Name"
      :rules="[rules.required]"
      :disabled="isSending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      ref="dateOfBirth"
      v-model="focusedPatientState.Date_Of_Birth"
      label="Date Of Birth"
      :rules="[rules.required]"
      :disabled="isSending"
      mask="##/##/####"
      hint="DD/MM/YYYY"
      validate-on-blur
      return-masked-value
    ></v-text-field>
    <v-radio-group
      v-model="focusedPatientState.Gender"
      :disabled="isSending"
      :rules="[rules.required]"
      label="Gender"
    >
      <v-layout row wrap>
        <v-flex s6>
          <v-radio
            label="Male"
            value="M"
          ></v-radio>
        </v-flex>
        <v-flex s6>
          <v-radio
            label="Female"
            value="F"
          ></v-radio>
        </v-flex>
      </v-layout>
    </v-radio-group>
    <v-text-field
      v-model="focusedPatientState.Contact_Number"
      label="Mobile Number"
      :rules="[rules.required]"
      :disabled="isSending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      v-model="focusedPatientState.Email"
      label="E-mail"
      :rules="[rules.required, rules.validEmail]"
      :disabled="isSending"
      validate-on-blur
    ></v-text-field>

    <vuetify-google-autocomplete
      id="map"
      append-icon="search"
      placeholder="Search Address"
      label="Address"
      v-on:placechanged="onSelectAddress"
      :disabled="isSending"
      :value="addressText"
    ></vuetify-google-autocomplete>
  </v-form>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { emailRegex } from "../../lib/helpers/constants";
    import { Address } from "../../lib/models/address";

    export default {
      name: "PatientForm",
      data() {
          return {
            valid: false,
            rules: {
              required: value => !!value || 'Required.',
              validEmail: e => emailRegex.test(e) || 'Please enter a valid email address',
            },
          }
        },
      methods: {
          onSelectAddress(address) {
            if(address !== null && address !== undefined) {
              this.focusedPatientState.address = new Address(address).asQuorum();
            }
          },
          isFormValid() {
            this.$refs.form.validate();
            console.log("FOCUSED PATIENT STATE: ", this.focusedPatientState);
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
            console.log('Deprectaed');
          }
      },
      computed: {
          ...mapGetters([
            'focusedPatientState',
            'isSending',
          ]),
          addressText: function() {
            return new Address(this.focusedPatientState.address).toString();
          }
      }
    }
</script>

<style scoped>

</style>
