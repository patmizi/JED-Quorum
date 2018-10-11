<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>Medical Case</v-card-title>
        <v-card-text>
          SOME TEXT HERE
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-list two-line>
      <!--<v-subheader>Medical Cases</v-subheader>-->
      <template v-for="(item, index) in focusedPatientMedicalCases">
        <v-list-tile
          :key="item.Medical_Case_Id"
          @click="dialog = true"
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
        name: "MedicalCaseForm",
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
