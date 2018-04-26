<template>
   <v-container fluid grid-list-xl >
          <!-- <v-alert type="warning" :value="floorplanUrl==null">
            Please add floor plan for this event first
          </v-alert> -->

        <v-layout wrap mb-4 >
            <v-flex d-flex xs6>
                <img id="currentMap" :src="floorplanUrl"  >
                <canvas class="myCanvas" id="yy" ></canvas>
                <canvas  id="xy" ></canvas>
            </v-flex>
            
            <!-- <v-flex xs4>
              <v-card>
                <v-subheader>Floorplan Scale</v-subheader>
                <v-card-text>
                  <v-slider v-model="scale" @click="updateScale" prepend-icon="filter_list" :color="'info'" thumb-label step="1"></v-slider>
                </v-card-text>
              </v-card>
            </v-flex> -->
        
            <v-flex xs12>
              <!-- <v-btn small color="info" v-on:click.native="onPickFile">Browse</v-btn> -->
              <v-btn small color="success" v-if="image!=null" @click="onAddFloorplan">Save</v-btn>
              <v-btn small color="error" v-if="image!=null" @click="onDeleteFloorplan">delete</v-btn>
              <!-- {{floorplanUrl}}  -->
            </v-flex>

            <v-flex xs12 sm7 v-if="floorplanUrl!=null">
              <div>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-btn color="success" dark slot="activator" >Add Device</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          
                          <v-flex xs12 sm6  >
                           <v-text-field label="Label" v-model="editedItem.name"></v-text-field>
                          </v-flex>
                          <v-flex >
                              <v-radio-group v-model="editedItem.sigType" row :mandatory="false">
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
                            <v-text-field label="MAC" v-model="editedItem.mac" required :rules="macRules"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="X" v-model="editedItem.x" :rules="xRules"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Y" v-model="editedItem.y" :rules="yRules"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="save" :disabled="!formIsValid">Save</v-btn>
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
                      <v-alert :value="true" color="error" icon="warning">
                      Sorry, nothing to display here. Please add device to start project
                      </v-alert>
                  </template>
                </v-data-table>
              </div>
            </v-flex>

            <v-flex xs12 sm5 v-if="floorplanUrl!=null">
              <div>
                <v-dialog v-model="dialog2" max-width="500px">
                  <v-btn color="info" dark slot="activator" >Add POI</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle2 }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Name" v-model="editedItem2.name"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="X" v-model="editedItem2.x" :rules="xRules"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Y" v-model="editedItem2.y" :rules="yRules"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="close2">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="savePOI" :disabled="!formPOIIsValid">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                
                <v-data-table
                  :headers="headers2"
                  :items="items2"
                  hide-actions
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.x }}</td>
                    <td class="text-xs-right">{{ props.item.y }}</td>
                    <td class="text-xs-right">
                      <v-btn icon  @click="editItem2(props.item)">
                        <v-icon color="teal">edit</v-icon>
                      </v-btn>
                      <v-btn icon  @click="deleteItem2(props.item)">
                        <v-icon color="pink">delete</v-icon>
                      </v-btn>
                    </td>
                  </template>
                  <template slot="no-data">
                      <v-alert :value="true" color="error" icon="warning">
                      Sorry, nothing to display here :(
                      </v-alert>
                  </template>
                </v-data-table>
              </div>
            </v-flex>
        </v-layout>

        <!-- <v-btn
          fixed
          dark
          fab
          bottom
          right
          color="pink"
          v-if="floorplanUrl!=null"
          v-on:click.native="onPickFile">
        <v-icon>add</v-icon>
        </v-btn> -->

        <input 
          type="file" 
          style="display:none" 
          ref="fileInput" 
          accept="image/*"
          @change="onFilePicked">
                                
        
    </v-container>
</template>


<script>
import * as firebase from 'firebase'

  export default {
    props:[
      'id',
          ],
    data: () => ({
      scale:0,
      image: null,
      imageUrl: null,
      floorplanUrl: null,
      dialog: false,
      formHasErrors: false,
      canvas: null,
      macRules: [
        v => !!v || 'MAC Address is required',
        v => /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/.test(v) || 'MAC Address is invalid'
      ],
      xRules: [
         v => !!v || 'Coordinate x  is required',
         v => /[0-9]|\./.test(v) || 'Coordinate can only be number'
      ],
      yRules: [
         v => !!v || 'Coordinate y  is required',
         v => /[0-9]|\./.test(v) || 'Coordinate can only be number'
      ],
      headers: [
        {
          text: 'Label',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'MAC', value: 'mac',sortable: false },
        { text: 'Type', value: 'sigType',sortable: false },
        { text: 'X', value: 'x',sortable: false },
        { text: 'Y', value: 'y',sortable: false },
        { text: '', value: 'name', sortable: false }
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        mac: '',
        sigType: 'Wifi',
        x: '',
        y: '',
      },
      defaultItem: {
        name: '',
        mac: '',
        sigType: 'Wifi',
        x: '',
        y: '',
      },
      dialog2: false,
      headers2: [
        {
          text: 'Name',
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
        x: '',
        y: '',
      },
      defaultItem2: {
        name: '',
        x: '',
        y: '',
      },

    }),

    computed: {
      formIsValid () {
        // console.log(this.editedItem.x.toString())  
        return  this.editedItem.mac !== '' && this.editedItem.mac.match(/^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/) &&
                this.editedItem.sigType !== '' &&
                this.editedItem.x.toString().match(/[0-9]|\./) &&
                this.editedItem.x !== '' && 
                this.editedItem.y.toString().match(/[0-9]|\./) &&
                this.editedItem.y !== '' 

        // return true
      },
      submit() {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      },
      formPOIIsValid () {
          return  this.editedItem2.x.toString().match(/[0-9]|\./) &&
                  this.editedItem2.x !== '' &&
                  this.editedItem2.y.toString().match(/[0-9]|\./) &&
                  this.editedItem2.y !== '' 
                  
        },
      formTitle () {
        return this.editedIndex === -1 ? 'New Device' : 'Edit Device'
      },
      formTitle2 () {
        return this.editedIndex2 === -1 ? 'New POI' : 'Edit POI'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialog2 (val) {
        val || this.close2()
      }
    },


    methods: {
      updateFloorplan(floorplanUrl){
            this.floorplanUrl = floorplanUrl
        },
        updatePOI(items) {
          this.items2.push(items)
        },
        updateItems(items) {
          this.items.push(items)
        },
      updateScale() {
        firebase.database().ref('events/' + this.id).child('scale').set(this.scale)
      },
      readScale() {
        firebase.database().ref('events/' + this.id + '/scale').on('value', (snap) => {
          this.scale = snap.val()
        })
      },
      loadFloorplan() {
            var floorplanUrl = this.floorplanUrl
            firebase.database().ref('events/' + this.id + '/floorplanUrl').once('value', (snapshot) =>{
                floorplanUrl = snapshot.val()
                this.updateFloorplan(floorplanUrl)
            })
            
        },
      loadPOI() {
        var items = []
        var data = firebase.database().ref('events/' + this.id + '/Search').once('value', (snapshot) =>{
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val()
                items.push(childData)
                this.updatePOI(childData)
            })
            this.reDraw2(items)
        })
          // this.items2 = items
      },
      loadDevices() {
        var items = []
        var data = firebase.database().ref('events/' + this.id + '/Wifi').once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val()
                childData.sigType = 'Wifi'
                childData.mac = childSnapshot.key
                items.push(childData)
                this.updateItems(childData)
            })
            // this.reDraw(items)
        })
        var data = firebase.database().ref('events/' + this.id + '/Beacon').once('value', (snapshot) => {
          snapshot.forEach( (childSnapshot) => {
                var childData = childSnapshot.val()
                childData.sigType = 'Beacon'
                childData.mac = childSnapshot.key
                items.push(childData)
                // console.log(childData)
                this.updateItems(childData)
            })
            this.reDraw(items)
          })
          
          // this.updateItems(items)
          
      },
      addDevice () {
            const passData = {
              sigType: this.editedItem.sigType,
              mac: this.editedItem.mac
            }
            const devData = {
                name: this.editedItem.name,
                x: this.editedItem.x,
                y: this.editedItem.y,
            }
            if(this.editedItem.sigType==='Beacon')
            {
              firebase.database().ref('events').child(this.id).child('Beacon').child(this.editedItem.mac).update(devData)
              .catch((error) => {
                console.log(error)
              })
            }
            else
            {
              firebase.database().ref('events').child(this.id).child('Wifi').child(this.editedItem.mac).update(devData)
              //loadDevice()
              .catch((error) => {
                console.log(error)
              })
            }
        },
        addPOI () {
            let key
            const poiData = {
                name: this.editedItem2.name,
                x: this.editedItem2.x,
                y: this.editedItem2.y,
            }
            firebase.database().ref('events').child(this.id).child('Search').push(poiData)
            .then((data) => {
                key = data.key
                firebase.database().ref('events').child(this.id).child('Search').child(key).update({key:key})
            })
            .catch((error) => {
                console.log(error)
            })
        },
      editItem (item) {
        console.log('1')
        console.log(item)
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      editItem2 (item) {
        console.log('2')
        console.log(item)
        this.editedIndex2 = this.items2.indexOf(item)
        this.editedItem2 = Object.assign({}, item)
        this.dialog2 = true
      },
      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this device?') && this.items.splice(index, 1) && firebase.database().ref('events/' + this.id).child(item.sigType).child(item.mac).remove()
        this.reDraw(this.items)
      },
      deleteItem2 (item) {
        const index = this.items2.indexOf(item)
        confirm('Are you sure you want to delete this POI?') && this.items2.splice(index, 1) && firebase.database().ref('events/' + this.id + '/Search').child(item.key).remove()
        this.reDraw2(this.items2)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      close2 () {
        this.dialog2 = false
        setTimeout(() => {
          this.editedItem2 = Object.assign({}, this.defaultItem2)
          this.editedIndex2 = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          console.log('save')
          var updateData = {
              name: this.items[this.editedIndex].name,
              x: this.items[this.editedIndex].x,
              y: this.items[this.editedIndex].y,
          }
          firebase.database().ref('events/' + this.id).child(this.items[this.editedIndex].sigType).child(this.items[this.editedIndex].mac).remove()
          firebase.database().ref('events/' + this.id).child(this.editedItem.sigType).child(this.editedItem.mac).update(updateData)
        //  console.log(this.items)
         Object.assign(this.items[this.editedIndex], this.editedItem)
        //  console.log(this.items)
        } else {
          console.log('ggggg')
          this.items.push(this.editedItem)
          this.addDevice()
          this.reDraw(this.items)
        }
        this.close()
      },
      savePOI () {
        
        if (this.editedIndex2 > -1) {
          var updateData = {
              name: this.items2[this.editedIndex2].name,
              x: this.items2[this.editedIndex2].x,
              y: this.items2[this.editedIndex2].y,
          }
          firebase.database().ref('events/' + this.id + '/Search').child(this.items2[this.editedIndex2].key).update(updateData)
          console.log(this.items2)
          Object.assign(this.items2[this.editedIndex2], this.editedItem2)
          console.log(this.items2)
        } else {
          this.items2.push(this.editedItem2)
          this.addPOI()
          this.reDraw2(this.items2)
        }
        this.close2()
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
            this.floorplanUrl = this.imageUrl
            this.image=null
            this.imageUrl=null
        },
        onDeleteFloorplan () {
          this.image = null
          this.imageUrl = null
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
        reDraw(point) {
                var draw = document.getElementById('yy')
                draw.setAttribute('width', '550');
                draw.setAttribute('height', '450');
                var context = draw.getContext("2d");
                var radius = 8;
                context.translate(0, draw.height);
                context.scale(1, -1);
                // const self = this
                
                for (var i = 0; i < point.length; i++) {
                    context.beginPath();
                    context.arc(point[i].x * this.scale, point[i].y *this.scale, radius, 0, 2 * Math.PI, false);
                    context.fillStyle = 'green';
                context.fill();
                context.lineWidth = 5;
                    
                }
        },
        reDraw2(point) {
          console.log(point)
                var draw = document.getElementById('xy')
                draw.setAttribute('width', '550');
                draw.setAttribute('height', '450');
                var context = draw.getContext("2d");
                var radius = 8;
                context.translate(0, draw.height);
                context.scale(1, -1);
                // const self = this
                
                for (var i = 0; i < point.length; i++) {
                    context.beginPath();
                    context.arc(point[i].x * this.scale, point[i].y *this.scale, radius, 0, 2 * Math.PI, false);
                    context.fillStyle = 'blue';
                context.fill();
                context.lineWidth = 5;
                    
                }
              }
          },
    beforeMount(){
      this.loadFloorplan()
    },
    mounted() {
      // this.loadFloorplan()
      this.readScale()
      this.loadDevices()
      this.loadPOI()
        
    }
  }
</script>

<style scoped>

#currentMap {
    position: absolute;
    width: 550px;
    /* height: 480px; */
    z-index:0;
    /* margin: auto; */
}

#xy {
    position: absolute;
    width: 550px;
    /* height: 480px; */
    z-index:1;
    /* margin: auto; */
}

.myCanvas {
    position: relative;
    width: 550px; 
    height: 450px;
    /* border:1px solid #000; */
    z-index: 0;
}


</style>
