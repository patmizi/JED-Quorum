<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="focusedDoctor.First_Name"
      label="First Name"
      :rules="[rules.required]"
      :disabled="sending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      v-model="focusedDoctor.Last_Name"
      label="Last Name"
      :rules="[rules.required]"
      :disabled="sending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      ref="dateOfBirth"
      v-model="focusedDoctor.Date_Of_Birth"
      label="Date Of Birth"
      :rules="[rules.required]"
      :disabled="sending"
      mask="##/##/####"
      hint="DD/MM/YYYY"
      validate-on-blur
      return-masked-value
    ></v-text-field>
    <v-radio-group
      v-model="focusedDoctor.Gender"
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
      v-model="focusedDoctor.Contact_Number"
      label="Mobile Number"
      :rules="[rules.required]"
      :disabled="sending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      v-model="focusedDoctor.Email"
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
    ></vuetify-google-autocomplete>
  </v-form>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { emailRegex } from "../../lib/helpers/constants";
    import { Address } from "../../lib/models/address";
    import {
      RESET_FOCUS_DOCTOR,
    } from '../../_store/actions.type';
    import store from '../../_store';

    export default {
      name: "DoctorForm",
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
              this.focusedDoctor.address = new Address(address).asQuorum();
            }
          },
          isFormValid() {
            this.$refs.form.validate();
            console.log("FOCUSED DOCTOR STATE: ", this.focusedDoctor);
            return this.valid;
          },
          initForm() {
            this.valid = false;
            this.sending = false;
            store.dispatch(RESET_FOCUS_DOCTOR);
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
            'focusedDoctor'
          ])
        }
    }
</script>

<style scoped>

</style>
