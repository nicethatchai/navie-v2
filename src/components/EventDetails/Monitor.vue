<template>
<<<<<<< HEAD
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
=======
    <div>
        

        {{event.id}}

    </div>
</template>

<script>


export default {
  data: () => ({
      items: [
          'web', 'shopping', 'videos', 'images', 'news'
        ],
      sideMenu: [
        {icon: 'equalizer', title: 'Dashboard', link: '/dashboard'},
        {icon: 'desktop_windows', title: 'Monitor', link: '/monitor'},
        {icon: 'map', title: 'Floorplan', link: '/floorplan'},
        {icon: 'supervisor_account', title: 'Participant', link: '/participant'},
        // {icon: 'edit', title: 'Edit Event', link: '/edit'}
      ],
      menuItem: [
          {icon: 'today', title: 'Events', link: '/events'},
          {icon: 'person', title: 'Profile', link: '/profile'},
          {icon: 'exit_to_app', title: 'Sign out'}
      ]
    }),
    props: [
      'id'
    ],
    computed: {
      event () {
        return this.$store.getters.loadedEvent(this.id)
        // console.log(this.$store.getters.loadedEvent (this.id))
      }
    },
}
</script>

>>>>>>> 63f5bdc00eea30b3a50e028fe1598e97ac807fbd
