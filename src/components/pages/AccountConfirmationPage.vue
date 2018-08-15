<template>
    <div>
      ACCOUNT HAS BEEN CONFIRMED
      <br><br>
      {{identityServerResponse}}
    </div>
</template>

<script>
    import {confirm} from '../../lib/auth';
    export default {
        name: "AccountConfirmationPage",
        mounted() {
          console.log('extracting url params: ', this.$route);
          this.confirmAccount()
            .then((res) => {
              console.log("Successfully confirmed the account: ", res);
              this.identityServerResponse = res;
            })
            .catch((err) => {
              console.log("An error occurred when confirming the token: ", err);
              this.identityServerResponse = err;
            })
        },
        data() {
          return {
            identityServerResponse: "",
          }
        },
        methods: {
          extractConfirmationToken(fullPathRoute) {
            return fullPathRoute.replace("/confirmation_token=", "")
          },
          confirmAccount() {
            console.log("Confirming account with token: ", this.extractConfirmationToken(this.$route.fullPath));
            return confirm(this.extractConfirmationToken(this.$route.fullPath));
          }
        }
    }
</script>

<style scoped>

</style>
