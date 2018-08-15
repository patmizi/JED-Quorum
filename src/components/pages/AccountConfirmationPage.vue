<template>
    <div>
      ACCOUNT HAS BEEN CONFIRMED. YOU WILL BE REDIRECTED SHORTLY...
    </div>
</template>

<script>
    export default {
        name: "AccountConfirmationPage",
        mounted() {
          console.log('extracting url params: ', this.$route);
          setTimeout(() => {
            this.$router.push('login');
          }, 2000);
        },
    }
</script>

<style scoped>

</style>
