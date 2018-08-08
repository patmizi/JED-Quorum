<template>
    <div>
      <v-text-field label="Username"></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
        :type="showPassword ? 'text' : 'password'"
        :rules="[rules.required, rules.min]"
        name="input-10-1"
        label="Normal with hint text"
        hint="At least 8 characters"
        counter
        @click:append="showPassword = !showPassword"
      ></v-text-field>
    </div>
</template>

<script>
    export default {
        name: "LoginPanel",
        data() {
          return {
            showPassword: false,
            password: "",
            rules: {
              required: value => !!value || 'Required.',
              min: v => v.length >= 8 || 'Min 8 characters',
              emailMatch: () => ('The email and password you entered don\'t match')
            }
          }
        }
    }
</script>

<style scoped>

</style>
