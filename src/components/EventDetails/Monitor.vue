<template>
   <v-container grid-list-xl >
        <v-layout wrap mb-4 >
            <!-- <v-flex xs12 sm6 v-on:mousemove="updateCoordinate">
              <div class="floor-rabel">
                Floor: {{floor}}
              </div>
            </v-flex> -->
        </v-layout>
        <div class="content" v-on:mousemove="updateCoordinate">
           
           <div class="floor-plan">
                <img id="currentMap" :src="floorplanUrl[0]" >
                <!-- <img id="currentMap" src="../../static/img/cpe_floor4.png" alt=""> -->
                <canvas id="myCanvas"></canvas>
           </div>

       </div>
       
       <div class="content2">
           Active: {{activeUsers}}
           <button @click="increase" type="button" class="btn btn-info">Walk</button>
       </div>
       <div class="content3">
           <!-- <button @click="increase" type="button" class="btn btn-info">Walk</button> -->
       </div>
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
      floorplanUrl: null,
      activeUsers:1,
            floor: 1,
            coor: {
                x: 0,
                y: 0,
            },
    }),

    computed: {
    },
    methods: {
      loadFloorplan() {
        var items = []
        // console.log(this.id)
        var url = firebase.database().ref('events/' + this.id + '/floorplanUrl').once('value')
          .then(function(snapshot) {
              url = snapshot.val()
              console.log(snapshot.val())
              if(snapshot.val()===null){
                items = null
              }
              else {
                items.push(url)
              }
          })
        // console.log(items)
        this.floorplanUrl = items
        // console.log(this.floorplanUrl)
      },
      updateCoordinate: function(event) {
            this.x = event.clientX;
            this.y = event.clientY
        },
        reDraw: function() {
            console.log("WTF?")
                var draw  = document.getElementById("myCanvas");
                draw.setAttribute('width', '550');
                draw.setAttribute('height', '450');
                var context = draw.getContext("2d");
                var radius = 10;
                var x = this.coor.x;
                var y = this.coor.y;
                context.translate(0, draw.height);
                context.scale(1, -1);
                const self = this
                console.log("Drawing")
                console.log(x,y)
                context.beginPath();
                context.arc(x, y, radius, 0, 2 * Math.PI, false);
                context.fillStyle = 'green';
                context.fill();
                context.lineWidth = 5;
        },
        getData: function() {
            var ref = firebase.database().ref("events/CPE floor 4/Search/401/")
            ref.on("value", function(snapshot) {
            console.log(snapshot.val());
            }, function (error) {
            console.log("Error: " + error.code);
            });
        },
        increase: function() {
            this.coor.x = this.coor.x + Math.floor(Math.random() * (10 - 0 + 1));
            this.coor.y = this.coor.y + Math.floor(Math.random() * (10 - 0 + 1));
            this.reDraw()
            console.log(`${this.coor.x},${this.coor.y}`);
        },
    },
    beforeMount() {
        this.loadFloorplan()
    }
  }
</script>

<style scoped>

#currentMap {
    position: absolute;
    width: 550px;
    /* height: 400px; */
    z-index: 1;
    /* margin: auto; */
}

#myCanvas {
    position: relative;
    width:550px; 
    height: 450px;
    border:1px solid #000;
    z-index: 20;
}


</style>

