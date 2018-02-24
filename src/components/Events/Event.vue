<template>
    <div>
        <!-- Side Bar -->
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.width > 1264"
            fixed
            v-model="drawer"
            stateless
            app
            disable-resize-watcher
            permanent
          >
          <v-list dense>
            <v-list-tile @click="" v-for="item in sideMenu" :key="item.title" :to="/events/ + id + item.link">
              <template>

              <v-list-tile-action>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </v-list-tile-content>
                              
              </template>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>     
    
    <!-- {{ event.title }} -->

    <router-view></router-view>

    </div>
</template>

<script>
import Dashboard from '../EventDetails/Dashboard.vue'
import Floorplan from '../EventDetails/Floorplan.vue'
import Monitor from '../EventDetails/Monitor.vue'
import Participant from '../EventDetails/Participant.vue'
// import EditEvent from './components/EventDetails/EditEvent.vue'

export default {
  data: () => ({
      // id: this.id,
      items: [
          'web', 'shopping', 'videos', 'images', 'news'
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      drawer: true,
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
        return this.$store.getters.loadedEvent (this.id)
        console.log(this.$store.getters.loadedEvent (this.id))
      }
    },
    components: {
      appDashboard:Dashboard,
      appFloorplan:Floorplan,
      appMonitor:Monitor,
      appParticipant:Participant,
      // appEditEvent:EditEvent
    }
}
</script>

