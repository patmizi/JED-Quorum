<template>
  <div>
    <v-list two-line>
      <!--<v-subheader>Medical Cases</v-subheader>-->
      <template v-for="(item, index) in focusedPatientMedicalCases">
        <v-list-tile
          :key="item.Medical_Case_Id"
          @click="openAddModal"
          class="elevation-1 tile-component"
        >
          <v-list-tile-content>
            <v-list-tile-title>Case Id:{{item.Medical_Case_Id}} - {{item.Medical_Case_Name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{item.Medical_Case_Description}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            View/Edit
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
    <AddMedicalCaseModal ref="addMedicalCaseModal"></AddMedicalCaseModal>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import AddMedicalCaseModal from '../pages/modals/cases/AddMedicalCaseModal';

    export default {
        name: "MedicalCaseList",
        components: {
          AddMedicalCaseModal
        },
        data() {
          return {
            dialog: false
          }
        },
        methods: {
          openAddModal() {
            console.log("opening modal...");
            this.$refs.addMedicalCaseModal.openModal();
          },
        },
        computed: {
          ...mapGetters([
            'focusedPatientMedicalCases'
          ]),
        }
    }
</script>

<style scoped>
  .tile-component {
    margin: 10px;
  }
</style>
