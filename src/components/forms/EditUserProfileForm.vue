<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="email"
      label="E-mail"
      disabled
    ></v-text-field>
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
  </v-form>
</template>

<script>
  import { emailRegex } from "../../lib/helpers/constants";

  export default {
    name: "EditUserProfileForm",
    data() {
      return {
        valid: false,
        email: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        dateOfBirth: "",
        sending: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          validEmail: e => emailRegex.test(e) || 'Please enter a valid email address',
        }
      }
    },
    methods: {
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
            businessRole: this.businessRole
          };
        }
        return null;
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
