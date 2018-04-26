<template>
  <v-app id="inspire" >

    <v-toolbar dark app fixed clipped-left class="indigo darken-4">
      <v-toolbar-title>
        <router-link to="/home" tag="span" style="cursor: pointer">{{header}}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}</v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLockout">
          <v-icon left>exit_to_app</v-icon>
          Sign out</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Sign in dialog -->
    <!-- <v-dialog v-model="dialog" persistent max-width="400px">
      <v-btn color="primary" dark slot="activator" style="display:none">Open Dialog</v-btn>
      <v-card>
          <app-signin></app-signin>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat type="submit">Sign in</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <v-content>
          <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
// import Signin from './components/Home/Signin.vue'

  export default {
    data: () => ({
      header: 'NAVIE',
      dialog: false,
      drawer: false,
      sideMenu: [
        {icon: 'equalizer', title: 'Dashboard', link: '/dashboard'},
        {icon: 'desktop_windows', title: 'Monitor', link: '/monitor'},
        {icon: 'map', title: 'Floorplan', link: '/floorplan'},
        {icon: 'supervisor_account', title: 'Participant', link: '/participant'},
        {icon: 'edit', title: 'Edit Event', link: '/settings'}
      ],
    }),
    watch: {
      user (value) {
          if (value !== null && value !== undefined) {
              this.$router.push('/events')
          }
      }
    },
    computed: {
      user () {
          return this.$store.getters.user
      },
      menuItems () {
        let menuItems = [
          {icon: 'home', title: 'Home', link: '/home'},
          // {icon: 'file_download', title: 'Download'},
          // {icon: 'account_box', title: 'About'},
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'today', title: 'Events', link: '/events'},
            // {icon: 'person', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLockout() {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    },
    props: {
      source: String
    },
    // components: {
    //   appSignin:Signin,
    // }
  }
</script>
