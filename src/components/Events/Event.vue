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
    <router-view id="id"></router-view>
    

    </div>
</template>

<script>

export default {
  data: () => ({
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

}
</script>

