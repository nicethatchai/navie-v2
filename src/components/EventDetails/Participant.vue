<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4 mb-1>
                  <v-text-field label="Name" v-model="editedItem.name" ></v-text-field>
                  <v-date-picker color="blue" locale="th" first-day-of-week="1" v-model="editedItem.dob" landscape  ></v-date-picker>
                  <!-- :allowed-dates="allowedDates" -->
                </v-flex>

                <v-flex xs12 sm6 md4 mb-1 >
                  <v-text-field label="Date of Birth" v-model="editedItem.dob" disabled></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4 mb-1>
                  <v-card-text>
                    <v-radio-group v-model="editedItem.gender" row>
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
            <v-btn color="blue darken-1" :disabled="!formIsValid" flat @click.native="save" type="submit">Save</v-btn>
          </v-card-actions>

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
          <v-btn icon class="mx-0" @click="editItem(props.item)" v-if="props.item.editable">
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
      today: Date(),
      search: '',
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
        dob: '',
        age: '',
      },
      defaultItem: {
        name: '',
        gender: '',
        dob: '',
        age: '',
      }
    }),

    computed: {
      formIsValid () {
            return this.editedItem.name !== '' &&
                this.editedItem.gender !== '' &&
                this.editedItem.dob !== '' 
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
      loadPart(key) {
        var it = this.items
        var data = firebase.database().ref('events/' + this.id + '/registers/' + key).once('value')
            .then(function(snapshot) {
              it.push(snapshot.val())
          })
          this.items = it
      },
      loadParts() {
        var items = []
        var data = firebase.database().ref('events/' + this.id + '/registers').once('value')
            .then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val()
                items.push(childData)
            })
          })
          this.items = items
      },
      loadParticipants() {
        var it = this.items
        firebase.database().ref('events/' + this.id + '/participants').once('value')
            .then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val()
                firebase.database().ref('users/' + childSnapshot.key).once('value')
                .then(function(snapshot) {
                  var birthday = new Date(snapshot.val().dob)
                  var ageDifMs = Date.now() - birthday.getTime()
                  var ageDate = new Date(ageDifMs);
                  var age = Math.abs(ageDate.getUTCFullYear() - 1970)
                  var data = {
                    key: childSnapshot.key,
                    dob: snapshot.val().dob,
                    name: snapshot.val().name,
                    age: age,
                    gender: snapshot.val().gender,
                    editable: false,
                  }
                  it.push(data)
                })
            })
          })
          this.items = it
          console.log(this.item)
      },
      addPart () {
            let key
            const partData = {
                dob: this.editedItem.dob,
                name: this.editedItem.name,
                age: this.toAge(this.editedItem.dob),
                gender: this.editedItem.gender,
                editable: true,
            }
            firebase.database().ref('events').child(this.id).child('registers').push(partData)
            .then((data) => {
                key = data.key
                firebase.database().ref('events').child(this.id).child('registers').child(key).update({key:key})
                this.loadPart(key)
            })
            .catch((error) => {
                console.log(error)
            })
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
        if(item.editable){
          firebase.database().ref('events/' + this.id + '/registers').child(item.key).remove()
        }
        else {
          firebase.database().ref('events/' + this.id + '/participants').child(item.key).remove()
        }        
        if(this.pages < tempPages) {
          this.pagination.page = tempPages - 1
        }
      },
      toAge(dob) {
        var birthday = new Date(dob)
        var ageDifMs = Date.now() - birthday.getTime()
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          this.editedItem.age = this.toAge(this.editedItem.dob)
          Object.assign(this.items[this.editedIndex], this.editedItem)
          firebase.database().ref('events/' + this.id + '/registers').child(this.items[this.editedIndex].key).update(this.editedItem)
          
        } else {
          this.addPart()
        }
        this.close()
      },

      // allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0
      
    },
    beforeMount() {
        this.loadParts()
        this.loadParticipants()
    }
  }
</script>