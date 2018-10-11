<template>
    <div>
      <v-toolbar flat>
        <v-toolbar-title>Doctor Registry</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="doctors"
        :loading="loading"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left"><b>{{ props.item.Doctor_Id }}</b></td>
          <td class="text-xs-left">{{ props.item.First_Name }}</td>
          <td class="text-xs-left">{{ props.item.Last_Name }}</td>
          <td class="text-xs-left">{{ props.item.Contact_Number }}</td>
        </template>
        <template slot="no-data">
        </template>
      </v-data-table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { FETCH_DOCTORS, STATE_RESET } from '../../../_store/actions.type';
    import store from '../../../_store';

    export default {
      name: "DashboardDoctorsRegistry",
      components: {
      },
      data() {
        return {
          dialog: false,
          headers: [
            { text: 'Doctor ID',  align: 'left', sortable: true, value: 'Doctor_Id' },
            { text: 'First Name', sortable: true, value: 'First_Name'},
            { text: 'Last Name', sortable: true, value: 'Last_Name' },
            { text: 'Contact Number', sortable: false, value: 'Contact_Number' },
          ],
          editedIndex: -1,
          loading: false
        }
      },
      created() {
          store.dispatch(STATE_RESET)
            .then(() => {
              this.initialize()
            });
      },
      methods: {
        initialize() {
          this.loading = true;
          console.log("Initializing");
          Promise.all([
            store.dispatch(FETCH_DOCTORS)
          ]).then(() => {
            console.log("All actions have been finished...;");
            this.loading = false;
          })
        },
      },
      computed: {
        ...mapGetters([
          'doctors',
        ])
      }
    }
</script>

<style scoped>

</style>
