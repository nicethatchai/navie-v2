<template>
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

