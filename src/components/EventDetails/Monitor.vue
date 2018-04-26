<template>
   <v-container fluid grid-list-xl >
       <v-alert type="warning" :value="floorplanUrl[0]==null">
            Please add floor plan for this event first
        </v-alert>

        <v-layout row wrap mb-4 v-if="floorplanUrl[0]!=null" >
            <v-flex d-flex xs6>
                <img id="currentMap" :src="floorplanUrl[0]"  >
                <!-- <img id="currentMap" :src="temp"  > -->
                <v-card v-for="activeUser in activeUsers" :key="activeUser.id">
                    <!-- <v-card-media :src="floorplanUrl[0]" height="430px"> -->
                        <canvas class="myCanvas" id="xx" >1</canvas>
                    <!-- </v-card-media> -->
                    <!-- <img id="currentMap" src="../../static/img/cpe_floor4.png" alt=""> -->
                </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm5>
              <v-layout row wrap>
                <v-container fluid grid-list justify-center>
                  <v-layout row>
                    <v-flex d-flex >
                      <v-card >
                        <v-container fluid grid-list-lg>
                                <div align="center" >Active</div>
                                <div align="center"  id="active"> {{active}}</div>
                        </v-container>
                      </v-card>
                    </v-flex>

                    <v-flex d-flex >
                      <!-- <v-card > -->
                        <v-container fluid grid-list-lg>
                            
                            <div style="width:100px"></div>
                                <!-- <div align="center" >Coordinate</div> -->
                                
                                <!-- <v-flex xs12 sm6 md4 mb-1 v-for="event in events" :key="event.id"> -->
                                <!-- <div v-for="activeUser in activeUsers" :key="activeUser.id">
                                    <span> {{ activeUser.active }} : {{ activeUser.x }}, {{ activeUser.y }} </span>
                                </div> -->

                        </v-container>
                      <!-- </v-card> -->
                    </v-flex>
                  </v-layout>
                </v-container>
                

                <v-flex d-flex >
                    
                    <div style="height:300px"></div>
                </v-flex>

                </v-layout>
            </v-flex>
        </v-layout>

        <div class="content" v-on:mousemove="updateCoordinate">   
       </div>
       <!-- <v-btn color="info" @click="reDraw">Test</v-btn> -->
    </v-container>
</template>


<script>
import * as firebase from 'firebase'

  export default {
    props:[
      'id',
          ],
    data: () => ({
        // temp:'https://scontent.fbkk14-1.fna.fbcdn.net/v/t1.15752-9/31166817_1784265471612367_5831956303907389440_n.png?_nc_cat=0&oh=53bde3a95dfe2d73885de0fa2bb0ac88&oe=5B6606A0',
        scale:0,
        active: 0,
        image: null,
        imageUrl: '',
        floorplanUrl: null,
        floor: 1,
        activeUsers: [],
        canvas: null,
    }),

    computed: {
    },
    methods: {
        readScale() {
        firebase.database().ref('events/' + this.id + '/scale').on('value', (snap) => {
          this.scale = snap.val()
        })
        },
        updateActiveUsers(activeUsers){
            this.activeUsers = activeUsers
        },
        updateAcive(active) {
        this.active = active
        },
        countActive() {
        firebase.database().ref('events/' + this.id + '/participants').on('value', (snapshot) => {
          var active = 0
          snapshot.forEach((childSnapshot) => {
            if(childSnapshot.val().active === true){
              active++
            }
          })
          this.updateAcive(active)
        })
      },
        loadActiveUsers(){
            firebase.database().ref('events/' + this.id + '/participants').on('value', (snapshot) => {
                var activeUsers = []
                snapshot.forEach((childSnapshot) => {
                    if(childSnapshot.val().active){
                        activeUsers.push(childSnapshot.val())
                    }
                })
                this.activeUsers = activeUsers
                // const canvas = document.getElementById('xx')
                setTimeout(() => {
                    this.reDraw()
                }, 1000)
            })
        },
        loadFloorplan() {
            var items = []
            var url = firebase.database().ref('events/' + this.id + '/floorplanUrl').once('value')
            .then(function(snapshot) {
                url = snapshot.val()
                if(snapshot.val()===null){
                    items = null
                }
                else {
                    items.push(url)
                }
            })
            this.floorplanUrl = items

        },
        updateCoordinate(event) {
                this.x = event.clientX;
                this.y = event.clientY
            },
        reDraw() {

                // var draw  = this.canvas
                var draw = document.getElementById('xx')
                if (draw == null) {
                    console.error('no canvas in ')
                    return;
                }
                draw.setAttribute('width', '550');
                draw.setAttribute('height', '450');
                var context = draw.getContext("2d");
                var radius = 8;
                context.translate(0, draw.height);
                context.scale(1, -1);
                const self = this
                context.beginPath();
                var x = 50;
                var y = 50;
                for (var i = 0; i < this.activeUsers.length; i++) {
                    context.arc(this.activeUsers[i].x * this.scale, this.activeUsers[i].y *this.scale, radius, 0, 2 * Math.PI, false);
                    context.fillStyle = 'green';
                    context.fill();
                    context.lineWidth = 5;
                }
        },
        getData: function() {
            var ref = firebase.database().ref("events/CPE floor 4/Search/401/")
            ref.on("value", function(snapshot) {
            console.log(snapshot.val());
            }, function (error) {
            console.log("Error: " + error.code);
            });
        }
    },
    beforeMount(){
        this.loadFloorplan()
        // this.reDraw()
    },
    mounted(){
        
        this.readScale()
        this.countActive()
        this.loadActiveUsers()
        // this.reDraw()
        
        // this.canvas = document.getElementById("xx");
        
    },
  }
</script>

<style scoped>

#currentMap {
    position: absolute;
    width: 550px;
    /* height: 480px; */
    z-index: 1;
    /* margin: auto; */
}

.myCanvas {
    position: relative;
    width: 550px; 
    height: 450px;
    /* border:1px solid #000; */
    z-index: 20;
}


</style>

