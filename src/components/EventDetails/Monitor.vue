<template>
   <v-container grid-list-xl >
        <v-layout wrap mb-4 >
            <v-flex xs12 sm6>
              <img :src="temp" height="400">
            </v-flex>
        </v-layout>
        
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
      temp: 'https://scontent.fbkk14-1.fna.fbcdn.net/v/t1.15752-9/31164117_1781337538571827_6239082099345719296_n.png?_nc_cat=0&oh=5e2105843bdf16fe8d350c5b50dd2374&oe=5B65994C',
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
      }
    },
    methods: {
    },
    beforeMount() {
        this.loadFloorplan
    }
  }
</script>
