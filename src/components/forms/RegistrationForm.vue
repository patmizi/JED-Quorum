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
      <vuetify-google-autocomplete
        id="map"
        append-icon="search"
        placeholder="Search Address"
        v-on:placechanged="onSelectAddress"
        :disabled="sending"
      ></vuetify-google-autocomplete>
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
      <v-text-field
        ref="password1field"
        v-model="password"
        :append-icon="showPassword1 ? 'visibility_off' : 'visibility'"
        label="Password"
        :type="showPassword1 ? 'text' : 'password'"
        :rules="[rules.required, rules.min, rules.matchingPasswords]"
        :disabled="sending"
        @click:append="showPassword1 = !showPassword1"
        v-on:blur="triggerPasswordValidation(true)"
        validate-on-blur
      ></v-text-field>
      <v-text-field
        ref="password2field"
        v-model="password2"
        label="Confirm Password"
        :append-icon="showPassword2 ? 'visibility_off' : 'visibility'"
        :type="showPassword2 ? 'text' : 'password'"
        :rules="[rules.required, rules.matchingPasswords]"
        :disabled="sending"
        @click:append="showPassword2 = !showPassword2"
        v-on:blur="triggerPasswordValidation(false)"
        validate-on-blur
      ></v-text-field>
      <v-radio-group
        v-model="businessRole"
        :disabled="sending"
        :rules="[rules.required]"
        label="I am a: "
      >
        <v-layout row wrap>
          <v-flex s6>
            <v-radio
              label="Business Admin"
              value="receptionist"
            ></v-radio>
          </v-flex>
          <v-flex s6>
            <v-radio
              label="Medical Professional"
              value="doctor"
            ></v-radio>
          </v-flex>
        </v-layout>
      </v-radio-group>
  </v-form>
</template>

<script>
    import { emailRegex } from "../../lib/helpers/constants";
    import { Address } from "../../lib/models/address";

    export default {
      name: "RegistrationForm",
      data() {
          return {
            valid: false,
            email: "",
            password: "",
            password2: "",
            firstName: "",
            lastName: "",
            mobileNumber: "",
            dateOfBirth: "",
            businessRole: "",
            address: null,
            showPassword1: false,
            showPassword2: false,
            sending: false,
            rules: {
              required: value => !!value || 'Required.',
              min: v => v.length >= 8 || 'Min 8 characters',
              validEmail: e => emailRegex.test(e) || 'Please enter a valid email address',
              matchingPasswords: () => {
                if (this.password.length <= 0 || this.password2.length <= 0) return true;
                return this.password === this.password2 || 'Passwords don\'t match';
              }
            }
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
                username: this.email,
                password: this.password,
                email: this.email,
                fullName: [this.firstName, this.lastName].join(' '),
                firstName: this.firstName,
                lastName: this.lastName,
                contactNumber: this.mobileNumber,
                dateOfBirth: this.dateOfBirth,
                businessRole: this.businessRole,
                address: this.address
              };
            }
            return null;
          },
          triggerPasswordValidation(trigger2) {
              if(trigger2) this.$refs.password2field.validate();
              else this.$refs.password1field.validate();
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
