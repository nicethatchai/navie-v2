<template>
  <div>
    
    <v-dialog v-model="dialog" max-width="600px">
      <!-- <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn> -->
      <v-card>
        <form @submit.prevent="onCreatePart">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4 mb-1>
                  <v-text-field label="Name" v-model="name"></v-text-field>
                </v-flex>
                         <v-flex xs12 sm6 md4 mb-1 >
                  <v-text-field label="Age" v-model="age"></v-text-field>
                    <!-- <h4>Date of Birth</h4>
                    <v-date-picker color="blue" locale="th" first-day-of-week="1" v-model="editedItem.age" :reactive="reactive"></v-date-picker> -->
                    <!-- <p> {{date}} </p> -->
                </v-flex> 
                <v-flex xs12 sm6 md4 mb-1>
                  <!-- <v-text-field label="Gender" v-model="editedItem.gender"></v-text-field> -->
                  <v-card-text>
                    <v-radio-group v-model="gender">
                        <v-radio 
                        label="Male" 
                        value="Male"
                        color="indigo" ></v-radio>
                        <v-radio 
                        label="Female" 
                        value="Female"
                        color="pink"></v-radio>
                    </v-radio-group>
                </v-card-text>
                </v-flex>
       
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" :disabled="!formIsValid" flat @click.native="dialog = false" type="submit">Save</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>

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
      :headers="headers"
      :items="items"
      hide-actions
      :search="search"
      :pagination.sync="pagination"
      disable-initial-sort
      class="elevation-1"
    >
    
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.gender }}</td>
        <td class="text-xs-right">{{ props.item.age }}</td>
        <td class="right layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
      </template>
    </v-data-table>
    
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="pink"
      v-on:click.native="dialog = true">
      <v-icon>add</v-icon>
    </v-btn>

    <!-- <v-btn
      fixed
      dark
      fab
      top
      right
      color="pink"
      v-on:click.native="testFetch()">
      <v-icon>add</v-icon>
    </v-btn> -->

    <div class="text-xs-center pt-2" >
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>


<script>
import * as firebase from 'firebase'

  export default {
    props:['id'],
    data: () => ({
      search: '',
      name:'',
      gender: '',
      age: '',
      dialog: false,
      pagination: {
        rowsPerPage:8
      },
      selected: [],
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Gender', value: 'gender' },
        { text: 'Age', value: 'age' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      items: [
           ],
      editedIndex: -1,
      editedItem: {
        name: '',
        gender: '',
        age: '',
      },
      defaultItem: {
        name: '',
        gender: '',
        age: '',
      }
    }),

    computed: {
      loadParts() {
        var items = []
        var data = firebase.database().ref('events/' + this.id + '/registers').once('value')
            .then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val()
                items.push(childData)
                // console.log(childData)
            })
          })
          this.items = items
      },
      formIsValid () {
            return this.name !== '' &&
                this.gender !== '' &&
                this.age !== '' 
        },
      loading () {
            return this.$store.getters.loading
        },
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0
        return Math.ceil(this.items.length / this.pagination.rowsPerPage)
        
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Participant' : 'Edit Partcipant'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    methods: {
      onCreatePart () {
            console.log('Create Participant')
            if (!this.formIsValid) {
                return
            }
            const partData = {
                id: this.id,
                name: this.name,
                age: this.age,
                gender: this.gender,
            }
            console.log(partData)
            this.$store.dispatch('createPart',partData)
            this.loadParts
        },
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        var tempPages = this.pages
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
        if(this.pages < tempPages) {
          this.pagination.page = tempPages - 1
        }
      },
      // toAge(dob) {
      //   var str = dob;
      //   var year = str.split("-")
      //   var age = 208
      // },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      }
    },
    beforeMount() {
        this.loadParts
    }
  }
</script>