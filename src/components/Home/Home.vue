<template>
  <div>
    home
    <!-- <app-signin></app-signin> -->
    <app-footer></app-footer>
  </div>

</template>

 <script src="https://unpkg.com/vue/dist/vue.js"></script>
 <script src="https://unpkg.com/vuetify/dist/vuetify.js"></script>
 <script>
 import Footer from './Footer.vue';
 import Signin from './Signin.vue';

  export default {
    data () {
      return {
        title: 'Navie',
        barMenu: [
        {icon: 'home', title: 'Home', link: '/home'},
        {icon: 'file_download', title: 'Download', link: '/download'},
        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
      }
    },
    methods: {
    },
    components: {
    // appHeader: Header,
      appFooter: Footer,
      appSignin: Signin
    }
  }
</script>
