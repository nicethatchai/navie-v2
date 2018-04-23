<template>
   <v-container grid-list-xl >
        <v-layout wrap mb-4 >
            <v-flex xs12>
              <img :src="imageUrl" height="350">
            </v-flex>
            <!-- <v-flex xs12>
              <v-btn small color="info" v-on:click.native="onPickFile">Browse</v-btn>
              <v-btn small color="success" v-if="image!=null" @click="onAddFloorplan">Save</v-btn>
              <v-btn small color="error" v-if="image!=null" >delete</v-btn>
              {{floorplanUrl}}
            </v-flex> -->
            <v-flex xs12 sm7>
              <div>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-btn color="primary" dark slot="activator" >Add Device</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex >
                              <v-radio-group v-model="sigType">
                                  <v-radio 
                                  label="Wifi" 
                                  value="Wifi"
                                  color="indigo" ></v-radio>
                                  <v-radio 
                                  label="Beacon" 
                                  value="Beacon"
                                  color="pink"></v-radio>
                              </v-radio-group>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="Label" v-model="editedItem.name"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="MAC" v-model="editedItem.mac"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="X" v-model="editedItem.x"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Y" v-model="editedItem.y"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                
                <v-data-table
                  :headers="headers"
                  :items="items"
                  hide-actions
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.mac }}</td>
                    <td class="text-xs-right">{{ props.item.sigType }}</td>
                    <td class="text-xs-right">{{ props.item.x }}</td>
                    <td class="text-xs-right">{{ props.item.y }}</td>
                    <td class="text-xs-right">
                      <v-btn icon  @click="editItem(props.item)">
                        <v-icon color="teal">edit</v-icon>
                      </v-btn>
                      <v-btn icon  @click="deleteItem(props.item)">
                        <v-icon color="pink">delete</v-icon>
                      </v-btn>
                    </td>
                  </template>
                  <template slot="no-data">
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                  </template>
                </v-data-table>
              </div>
            </v-flex>

            <v-flex xs12 sm5>
              <div>
                <v-dialog v-model="dialog2" max-width="500px">
                  <v-btn color="primary" dark slot="activator" >Add POI</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex >
                              <v-radio-group v-model="sigType">
                                  <v-radio 
                                  label="Wifi" 
                                  value="Wifi"
                                  color="indigo" ></v-radio>
                                  <v-radio 
                                  label="Beacon" 
                                  value="Beacon"
                                  color="pink"></v-radio>
                              </v-radio-group>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="Label" v-model="editedItem.name"></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="MAC" v-model="editedItem.mac"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="X" v-model="editedItem.x"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Y" v-model="editedItem.y"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                
                <v-data-table
                  :headers="headers2"
                  :items="items"
                  hide-actions
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <!-- <td class="text-xs-right">{{ props.item.mac }}</td> -->
                    <!-- <td class="text-xs-right">{{ props.item.sigType }}</td> -->
                    <td class="text-xs-right">{{ props.item.x }}</td>
                    <td class="text-xs-right">{{ props.item.y }}</td>
                    <td class="text-xs-right">
                      <v-btn icon  @click="editItem(props.item)">
                        <v-icon color="teal">edit</v-icon>
                      </v-btn>
                      <v-btn icon  @click="deleteItem(props.item)">
                        <v-icon color="pink">delete</v-icon>
                      </v-btn>
                    </td>
                  </template>
                  <template slot="no-data">
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                  </template>
                </v-data-table>
              </div>
            </v-flex>
        </v-layout>
         

        <v-btn
            fixed
            dark
            fab
            bottom
            right
            color="pink"
            v-on:click.native="loadFloorplan"
            v-if="image==null">
            <v-icon>add</v-icon>
        </v-btn>
        <!-- <input 
          type="file" 
          style="display:none" 
          ref="fileInput" 
          accept="image/*"
          @change="onFilePicked"> -->

        
    </v-container>
</template>


<script>
import * as firebase from 'firebase'

  export default {
    props:[
      'id',
          ],
    data: () => ({
      image: null,
      imageUrl: '',
      temp: 'https://scontent.fbkk14-1.fna.fbcdn.net/v/t1.15752-9/31295508_1781331245239123_3988253012693876736_n.png?_nc_cat=0&oh=ef4b0c4d4d8482b7cefba9c5f70c58f6&oe=5B69AEC0',
      dialog: false,
      sigType: '',
      headers: [
        {
          text: 'Label',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'MAC', value: 'mac',sortable: false },
        { text: 'Type', value: 'sigType' },
        { text: 'X', value: 'x',sortable: false },
        { text: 'Y', value: 'y',sortable: false },
        { text: '', value: 'name', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        mac: '',
        sigType: '',
        x: 0,
        y: 0,
      },
      defaultItem: {
        name: '',
        mac: '',
        sigType: '',
        x: 0,
        y: 0,
      },
      dialog2: false,
      headers2: [
        {
          text: 'Label',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        // { text: 'MAC', value: 'mac',sortable: false },
        // { text: 'Type', value: 'sigType' },
        { text: 'X', value: 'x',sortable: false },
        { text: 'Y', value: 'y',sortable: false },
        { text: '', value: 'name', sortable: false }
      ],
      items2: [],
      editedIndex2: -1,
      editedItem2: {
        name: '',
        mac: '',
        sigType: '',
        x: 0,
        y: 0,
      },
      defaultItem2: {
        name: '',
        mac: '',
        sigType: '',
        x: 0,
        y: 0,
      },

    }),

    computed: {
      loadFloorplan() {
        console.log('loading')
        var floorplanUrl = ''
        var data = firebase.database().ref('events/' + this.id + '/floorplanUrl').once('value')
            .then(data => {
              console.log(data.val())
              this.imageUrl = data.val()
          })
          // this.items = items
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Device' : 'Edit Device'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
        
      initialize () {
        this.items = [
          {
            name: 'In lil',
            mac: '00:11:3b:0d:05:29',
            sigType: 'Wifi',
            x: 8,
            y: 11,
          },
          {
            name: 'In LInw',
            mac: '00:3a:99:05:f4:f0',
            sigType: 'Wifi',
            x: 8,
            y: 11,
          },
          {
            name: 'Fr ISNE',
            mac: '00:3a:99:40:44:b0',
            sigType: 'Wifi',
            x: 20,
            y: 14,
          },
          {
            name: 'Fr R412',
            mac: '0c:f5:a4:41:80:df',
            sigType: 'Wifi',
            x: 7,
            y: 4,
          },
          {
            name: 'Fr R416',
            mac: '50:67:ae:c2:41:1f',
            sigType: 'Wifi',
            x: 13,
            y: 9,
          },
          {
            name: 'Fr R402',
            mac: '94:d4:69:fc:8d:60',
            sigType: 'Wifi',
            x: 23,
            y: 17,
          },
          {
            name: 'In AARR',
            mac: '94:d4:69:fc:cc:a0',
            sigType: 'Wifi',
            x: 3,
            y: 7,
          },
          {
            name: 'In lil',
            mac: '00:11:3b:0d:05:29',
            sigType: 'Wifi',
            x: 8,
            y: 11,
          },
          {
            name: 'A6',
            mac: 'c1:1e:8d:7f:4f:9b',
            sigType: 'Beacon',
            x: 6,
            y: 7,
          },
          {
            name: 'A5',
            mac: 'c7:c1:4a:46:24:14',
            sigType: 'Beacon',
            x: 11,
            y: 10,
          },
          {
            name: 'A2',
            mac: 'd0:ab:1a:4a:be:5f',
            sigType: 'Beacon',
            x: 16,
            y: 5,
          },
          {
            name: 'A4',
            mac: 'e1:e3:55:e9:06:e3',
            sigType: 'Beacon',
            x: 5,
            y: 6,
          },
          {
            name: 'A3',
            mac: 'f8:ef:d7:68:32:a5',
            sigType: 'Beacon',
            x: 5,
            y: 10,
          },
          {
            name: 'A1',
            mac: 'f9:95:fd:c8:38:06',
            sigType: 'Beacon',
            x: 9,
            y: 2,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
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
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
        onAddFloorplan () {
            if (!this.image) {
                return
            }
            // firebase.storage().ref('Floorplans').put(this.image)
            const floorplan = {
                id: this.id,
                image: this.image,
            }
            this.$store.dispatch('addFloorplan',floorplan)
        },
        onPickFile() {
            this.$refs.fileInput.click()
        },
        onFilePicked(event) {
            const files = event.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <= 0) {
                return alert('Please add a valid file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },
    },
    beforeMount() {
        this.loadFloorplan
    }
  }
</script>
