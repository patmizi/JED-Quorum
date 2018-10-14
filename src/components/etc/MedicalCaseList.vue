<template>
  <div>
    <v-list two-line>
      <v-subheader>
        History
        <v-spacer></v-spacer>
        <v-btn @click="openAddModal" primary>Add</v-btn>
      </v-subheader>
      <template v-for="(item, index) in focusedPatientState.cases">
        <v-list-tile
          :key="index"
          @click="openEditModal(item)"
          class="elevation-1 tile-component"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{item.Medical_Case_Name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{item.Medical_Case_Description}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            View/Edit
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
    <AddMedicalCaseModal ref="addMedicalCaseModal"></AddMedicalCaseModal>
    <EditMedicalCaseModal ref="editMedicalCaseModal"></EditMedicalCaseModal>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import AddMedicalCaseModal from '../pages/modals/cases/AddMedicalCaseModal';
    import EditMedicalCaseModal from '../pages/modals/cases/EditMedicalCaseModal';
    import {SET_FOCUS_CASE} from '../../_store/actions.type';

    export default {
        name: "MedicalCaseList",
        components: {
          AddMedicalCaseModal,
          EditMedicalCaseModal,
        },
        data() {
          return {}
        },
        methods: {
          openAddModal() {
            console.log("opening modal...");
            this.$store.dispatch(SET_FOCUS_CASE, null) // This will reset the focused state
              .then(() => {
                this.$refs.addMedicalCaseModal.openModal();
              });
          },
          openEditModal(medicalCase) {
            console.log('opening edit modal...', medicalCase);
            this.$store.dispatch(SET_FOCUS_CASE, medicalCase.Medical_Case_Id);
            this.$refs.editMedicalCaseModal.openModal();
          },
        },
        computed: {
          ...mapGetters([
            'focusedPatientState'
          ]),
        }
    }
</script>

<style scoped>
  .tile-component {
    margin: 10px;
  }
</style>
