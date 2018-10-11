<template>
    <v-snackbar
      v-show="showAlerts"
      v-model="alertState.show"
      :color="alertState.color"
      :multi-line="alertState['multi-line']"
      :timeout="alertState.timeout"
      right
    >
      {{alertState.message}}
      <v-btn flat @click="alertState.show = false">Close</v-btn>
    </v-snackbar>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "AlertComponent",
        created: function(){
          setTimeout(() => {
            this.showAlerts = true;
          }, 5000);
        },
        data() {
          return {
            showAlerts: false,
          }
        },
        computed: {
          ...mapGetters([
            'alertState'
          ])
        }
    }
</script>

<style scoped>

</style>
