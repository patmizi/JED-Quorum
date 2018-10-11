<template>
    <div>
      <v-content>
        <v-container fluid>
          <v-layout wrap>
            <v-flex xs12>
              <v-layout wrap>
                <v-flex v-for="stat in statistics" xs6>
                  <v-card class="text-xs-center dashboard-item">
                    <v-card-title primary-title class="justify-center">
                      <div>
                        <h3 class="headline mb-0">{{stat.value}}</h3>
                      </div>
                    </v-card-title>
                    <v-card-text>
                      {{stat.label}}
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex sm12>
              <v-card height="100%" class="dashboard-item">
                <v-card-title>Upcoming Appointments</v-card-title>
                <v-data-table
                  :headers="tableHeaders"
                  :items="appointments"
                  hide-actions
                ></v-data-table>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left"><b>{{ props.item.Patient_Id }}</b></td>
                  <td class="text-xs-left">{{ props.item.First_Name }}</td>
                  <td class="text-xs-left">{{ props.item.Last_Name }}</td>
                  <td class="text-xs-left">{{ props.item.Contact_Number }}</td>
                  <td class="text-xs-left">{{ props.item.Date_Start }}</td>
                </template>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </div>
</template>

<script>
    export default {
      name: "DashboardDefault",
      data() {
          return {
            cardHeight: '80px',
            statistics:[
              {label:"Doctors", value: 10},
              {label: "Patients", value: 20}
            ],
            tableHeaders:[
              { text: 'Patient Id', align: 'left', value: 'Patient_Id' },
              { text: 'First Name', value: 'First_Name'},
              { text: 'Last Name', value: 'Last_Name' },
              { text: 'Contact Number', value: 'Contact_Number' },
              { text: 'Time', value: 'Date_Start'}
            ],
            appointments: []
          }
        }
    }
</script>

<style scoped>
  .dashboard-item {
    margin: 15px;
  }
</style>
