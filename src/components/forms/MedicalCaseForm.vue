<template>
  <div>
    <v-list two-line>
      <!--<v-subheader>Medical Cases</v-subheader>-->
      <template v-for="(item, index) in focusedPatientMedicalCases">
        <v-list-tile
          :key="item.Medical_Case_Name"
          @click=""
        >
          <v-list-tile-content>
            <v-list-tile-title>{{item.Medical_Case_Name}}</v-list-tile-title>
            <v-list-tile-title>{{item.Medical_Case_Description}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import store from '../../_store';

    export default {
        name: "MedicalCaseForm",
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
