<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit User Profile</span>
        </v-card-title>
        <v-card-text>
          <edit-profile-form
            ref="editProfileForm"
          ></edit-profile-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeModal">Close</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            :loading="sending"
            :disabled="sending"
            @click="updateDetails"
          >Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
    import { compileUserRegistrationMetadata } from '../../../lib/authMetadata';
    import { updateUserMetaData } from '../../../lib/auth';
    import EditUserProfileForm from "../../forms/EditUserProfileForm";

    export default {
        name: "UserSettingsModal",
        components: {
          'edit-profile-form': EditUserProfileForm
        },
        data: () => ({
          dialog: false,
          sending: false,
          updateError: false,
          updateErrorMessage: false,
        }),
        methods: {
          openModal() {
            this.dialog = true;
          },
          closeModal() {
            this.resetData();
            this.$refs.editProfileForm.setSubmitState(false);
          },
          resetData() {
            this.dialog = false;
            this.sending = false;
            this.updateError = false;
            this.updateErrorMessage = "";
          },
          updateDetails(){
            let formData = this.$refs.editProfileForm.getFormData();
            if(formData !== null){
              this.updateError = false;
              this.updateErrorMessage = "";
              this.$refs.editProfileForm.setSubmitState(true);
              this.sending = true;
              updateUserMetaData(compileUserRegistrationMetadata(formData)).then((res) => {
                console.log("Updated account metadata with res: ", res);
                this.$refs.editProfileForm.setSubmitState(false);
                this.sending = false;
              }).catch((err) => {
                this.updateError = true;
                this.updateErrorMessage = err.json.msg;
                this.$refs.editProfileForm.setSubmitState(false);
                this.sending = false;
              })
            }
          }
        }
    }
</script>

<style scoped>

</style>
