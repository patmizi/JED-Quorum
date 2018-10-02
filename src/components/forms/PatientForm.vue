<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="firstName"
      label="First Name"
      :rules="[rules.required]"
      :disabled="sending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      v-model="lastName"
      label="Last Name"
      :rules="[rules.required]"
      :disabled="sending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      ref="dateOfBirth"
      v-model="dateOfBirth"
      label="Date Of Birth"
      :rules="[rules.required]"
      :disabled="sending"
      mask="##/##/####"
      hint="DD/MM/YYYY"
      validate-on-blur
      return-masked-value
    ></v-text-field>
    <v-text-field
      v-model="mobileNumber"
      label="Mobile Number"
      :rules="[rules.required]"
      :disabled="sending"
      validate-on-blur
    ></v-text-field>
    <v-text-field
      v-model="email"
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
    import { emailRegex } from "../../lib/helpers/constants";
    import { Address } from "../../lib/models/address";

    export default {
      name: "PatientForm",
      data() {
          return {
            valid: false,
            sending: false,
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            email: "",
            mobileNumber: "",
            address: null,
            rules: {
              required: value => !!value || 'Required.',
              validEmail: e => emailRegex.test(e) || 'Please enter a valid email address',
            },
          }
        },
        methods: {
          onSelectAddress(address) {
            if(address !== null && address !== undefined) {
              this.address = new Address(address).asQuorum();
            }
          },
          getFormData() {
            this.$refs.form.validate();
            if(this.valid){
              return {
                email: this.email,
                fullName: [this.firstName, this.lastName].join(' '),
                firstName: this.firstName,
                lastName: this.lastName,
                contactNumber: this.mobileNumber,
                dateOfBirth: this.dateOfBirth,
                address: this.address
              };
            }
            return null;
          },
          initForm() {
            this.valid = false;
            this.sending = false;
            this.firstName = "";
            this.lastName = "";
            this.dateOfBirth = "";
            this.email = "";
            this.mobileNumber = "";
            this.address = null;
            this.$refs.form.reset();
          },
          /**
           * Sets the sending state to true or false
           * @param state {Boolean}
           */
          setSubmitState(state) {
            this.sending = state;
          }
        }
    }
</script>

<style scoped>

</style>
