<template>
  <!-- <v-container> -->
    <!-- <v-layout> -->
      <!-- <v-flex xs12> -->
        <v-card>
          <v-card-title>
            Participant
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-bind:headers="headers"
              v-bind:items="items"
              v-bind:search="search"
            >
            <template slot="items" slot-scope="props">
              <td>
                <v-edit-dialog
                  lazy
                > {{ props.item.name }}
                  <v-text-field
                    slot="input"
                    label="Edit"
                    v-model="props.item.name"
                    single-line
                    counter
                    :rules="[max25chars]"
                  ></v-text-field>
                </v-edit-dialog>
              </td>
              <td class="text-xs-right">{{ props.item.gender }}</td>
              <td class="text-xs-right">{{ props.item.age }}</td>
              <!-- <td class="text-xs-right">{{ props.item.carbs }}</td>
              <td class="text-xs-right">{{ props.item.protein }}</td>
              <td class="text-xs-right">{{ props.item.sodium }}</td>
              <td class="text-xs-right">{{ props.item.calcium }}</td> -->
              <td class="text-xs-right">
                <v-edit-dialog
                  @open="tmp = props.item.iron"
                  @save="props.item.iron = tmp || props.item.iron"
                  large
                  lazy
                >
                  <div>{{ props.item.iron }}</div>
                  <div slot="input" class="mt-3 title">Update Iron</div>
                  <v-text-field
                    slot="input"
                    label="Edit"
                    v-model="tmp"
                    single-line
                    counter
                    autofocus
                    :rules="[max25chars]"
                  ></v-text-field>
                </v-edit-dialog>
              </td>
            </template>
            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>
        </v-card>
        <!-- </v-flex> -->
    <!-- </v-layout> -->
  <!-- </v-container> -->
</template>

<script>
  export default {
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Gender', value: 'gender' },
          { text: 'Age (year)', value: 'age' },
          // { text: 'Active', value: 'carbs' },
          // { text: 'Protein (g)', value: 'protein' },
          // { text: 'Sodium (mg)', value: 'sodium' },
          // { text: 'Calcium (%)', value: 'calcium' },
          // { text: 'Iron (%)', value: 'iron' }
        ],
        items: [
          {
            value: false,
            name: 'Rattapon Kaewpinjai',
            gender: 'Male',
            age: 21,
          },
          {
            value: false,
            name: 'Thatchai Chuaubon',
            gender: 'Male',
            age: 22,
          },
          {
            value: false,
            name: 'Narinrat Rongsawan',
            gender: 'Female',
            age: 22,
          },
          {
            value: false,
            name: 'Watchanan Chantapakul',
            gender: 'Male',
            age: 21,
          },
          {
            value: false,
            name: 'Piluck Chokdee',
            gender: 'Female',
            age: 21,
          },
          {
            value: false,
            name: 'Tananut Panyagosa',
            gender: 'Male',
            age: 22,
          },
          {
            value: false,
            name: 'Igris Chor',
            gender: 'Female',
            age: 20,
          },
          {
            value: false,
            name: 'Pink Chompu',
            gender: 'Female',
            age: 22,
          }
          
        ]
      }
    }
  }
</script>
