<template>
    <div>
      ACCOUNT HAS BEEN CONFIRMED
    </div>
</template>

<script>
    export default {
        name: "AccountConfirmationPage",
        mounted() {
          console.log('extracting url params: ', this.$route.query.page);
        }
    }
</script>

<style scoped>

</style>
