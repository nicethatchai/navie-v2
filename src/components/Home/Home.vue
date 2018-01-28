<template>
  <div>
    <app-content></app-content>
    <app-footer></app-footer>
  </div>
</template>

 <script src="https://unpkg.com/vue/dist/vue.js"></script>
 <script src="https://unpkg.com/vuetify/dist/vuetify.js"></script>
 <script>
 import Footer from './Footer.vue';
 import Content from './Content.vue';

  export default {
    data () {
      return {
        title: 'Navie',
        barMenu: [
        {icon: 'home', title: 'Home', link: '/home'},
        {icon: 'file_download', title: 'Download'},
        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
      }
    },
    methods: {
    },
    components: {
    // appHeader: Header,
      appFooter: Footer,
      appContent: Content
    }
  }
</script>
