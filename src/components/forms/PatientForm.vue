<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="focusedPatient.First_Name"
      label="First Name"
      :rules="[rules.required]"
      :disabled="sending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      v-model="focusedPatient.Last_Name"
      label="Last Name"
      :rules="[rules.required]"
      :disabled="sending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      ref="dateOfBirth"
      v-model="focusedPatient.Date_Of_Birth"
      label="Date Of Birth"
      :rules="[rules.required]"
      :disabled="sending"
      mask="##/##/####"
      hint="DD/MM/YYYY"
      validate-on-blur
      return-masked-value
    ></v-text-field>
    <v-radio-group
      v-model="focusedPatient.Gender"
      :disabled="sending"
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
      v-model="focusedPatient.Contact_Number"
      label="Mobile Number"
      :rules="[rules.required]"
      :disabled="sending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      v-model="focusedPatient.Email"
      label="E-mail"
      :rules="[rules.required, rules.validEmail]"
      :disabled="sending"
      validate-on-blur
    ></v-text-field>

    <vuetify-google-autocomplete
      id="map"
      append-icon="search"
      placeholder="Search Address"
      v-on:placechanged="onSelectAddress"
      :disabled="sending"
      :value="addressText"
    ></vuetify-google-autocomplete>
  </v-form>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { emailRegex } from "../../lib/helpers/constants";
    import { Address } from "../../lib/models/address";
    import {
      RESET_FOCUS_PATIENT,
    } from '../../_store/actions.type';
    import store from '../../_store';

    export default {
      name: "PatientForm",
      data() {
          return {
            valid: false,
            sending: false,
            rules: {
              required: value => !!value || 'Required.',
              validEmail: e => emailRegex.test(e) || 'Please enter a valid email address',
            },
          }
        },
      methods: {
          onSelectAddress(address) {
            if(address !== null && address !== undefined) {
              this.focusedPatient.address = new Address(address).asQuorum();
            }
          },
          isFormValid() {
            this.$refs.form.validate();
            console.log("FOCUSED PATIENT STATE: ", this.focusedPatient);
            return this.valid;
          },
          initForm() {
            this.valid = false;
            this.sending = false;
            store.dispatch(RESET_FOCUS_PATIENT);
            this.$refs.form.reset();
          },
          /**
           * Sets the sending state to true or false
           * @param state {Boolean}
           */
          setSubmitState(state) {
            this.sending = state;
          }
      },
      computed: {
          ...mapGetters([
            'focusedPatient'
          ]),
          addressText: function() {
            return new Address(this.focusedPatient.address).toString();
          }
      }
    }
</script>

<style scoped>

</style>
