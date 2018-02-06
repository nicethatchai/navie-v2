<template>
    <div>
        <v-navigation-drawer
        :clipped="$vuetify.breakpoint.width > 1264"
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
    </v-navigation-drawer>
    <!-- <v-toolbar dark fixed clipped-left class="indigo darken-4">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">{{ event.title }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="item in menuItem" :key="item.title" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}</v-btn>
        <v-btn flat>
          <v-icon left>exit_to_app</v-icon>
          Sign out</v-btn>
      </v-toolbar-items>
    </v-toolbar> -->
    <!-- <router-view></router-view> -->
    {{ event.title }}
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
        {icon: 'settings', title: 'settings', link: '/settings'}
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
      }
    }
}
</script>

