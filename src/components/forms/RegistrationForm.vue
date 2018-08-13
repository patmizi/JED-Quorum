<template>
  <v-container>
    <v-layout row class="text-xs-center">
      <!--play around with the grid width for optimal size-->
      <!--some widths aren't suitable for mobile viewports -->
      <v-flex xs6 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
        <v-card height="500px"></v-card>
      </v-flex>
      <v-flex xs12 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Login</h4>
            </v-card-title>
            <v-form>
              <v-text-field
                v-model="username"
                prepend-icon="person"
                name="Username"
                label="Username"
              ></v-text-field>
              <v-text-field
                v-model="password"
                prepend-icon="lock"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                :type="showPassword ? 'text' : 'password'"
                name="Password"
                label="Password"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-card-actions>
                <v-btn primary large block @click="login">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: "RegistrationForm",
        data() {
          return {
            showPassword: false,
            username: "",
            password: "",
            rules: {
              required: value => !!value || 'Required.'
            }
          }
        },
        methods:{
          login: () => {
            // TODO: Add form validation before submit and error highlighting.
            console.log("logging in...");
          }
        }
    }
</script>

<style scoped>

</style>
