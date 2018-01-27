<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="" v-for="item in sideMenu" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <v-toolbar dark app fixed clipped-left class="indigo darken-4">
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">NAVIE</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}</v-btn>
        <!-- <v-btn flat>
          <v-icon left>lock_open</v-icon>
          Sign in</v-btn> -->
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
      
    

  </v-app>
</template>

<script>
import Signin from './components/Home/Signin.vue'
// import Download from './components/Home/Download.vue'


  export default {
    data: () => ({
      drawer: false,
      sideMenu: [
        {icon: 'equalizer', title: 'Dashboard', link: '/dashboard'},
        {icon: 'desktop_windows', title: 'Monitor', link: '/monitor'},
        {icon: 'map', title: 'Floorplan', link: '/floorplan'},
        {icon: 'supervisor_account', title: 'Participant', link: '/participant'},
        {icon: 'settings', title: 'settings', link: '/settings'}
      ],
      menuItems: [
        {icon: 'home', title: 'Home', link: '/home'},
          {icon: 'file_download', title: 'Download', link: '/download'},
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'},
          {icon: 'today', title: 'Events', link: '/events'},
            {icon: 'person', title: 'Profile', link: '/profile'}
      ]
    }),
    // computed: {
    //   menuItems () {
    //     let menuItems = [
    //       {icon: 'home', title: 'Home', link: '/home'},
    //       {icon: 'file_download', title: 'Download', link: '/download'},
    //       {icon: 'face', title: 'Sign up', link: '/signup'},
    //       {icon: 'lock_open', title: 'Sign in', link: '/signin'}
    //     ]
    //     if (this.userIsAuthenticated) {
    //       menuItems = [
    //         {icon: 'today', title: 'Events', link: '/evnets'},
    //         {icon: 'person', title: 'Profile', link: '/profile'},
    //         {icon: 'exit_to_app', title: 'Sign out'}
    //       ]
    //     }
    //     return menuItems
    //   },
    //   userIsAuthenticated () {
    //     return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    //   }
    // },
    props: {
      source: String
    },
    components: {
      appSignin:Signin,
      // appDownload:Download
    }
  }
</script>
