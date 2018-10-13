<template>
  <div>
    STUFF GOES HERE
    <!--<v-list two-line>-->
      <!--&lt;!&ndash;<v-subheader>Appointment history</v-subheader>&ndash;&gt;-->
      <!--<template v-for="(item, index) in focusedPatientMedicalCases">-->
        <!--<v-list-tile-->
          <!--:key="item.Medical_Case_Name"-->
          <!--@click=""-->
        <!--&gt;-->
          <!--<v-list-tile-content>-->
            <!--<v-list-tile-title>{{item.Medical_Case_Name}}</v-list-tile-title>-->
            <!--<v-list-tile-title>{{item.Medical_Case_Description}}</v-list-tile-title>-->
          <!--</v-list-tile-content>-->
        <!--</v-list-tile>-->
      <!--</template>-->
    <!--</v-list>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import store from '../../_store/index';

  export default {
    name: "AppointmentHistory",
    data() {
      return {}
    },
    methods: {

    },
    computed: {
      ...mapGetters([
        'focusedPatientMedicalCases'
      ]),
    }
  }
</script>

<style scoped>

</style>
