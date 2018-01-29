import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home/Home'
import Download from '@/components/Home/Download'
import Signin from '@/components/Home/Signin'
import Events from '@/components/Events/Events'
import CreateEvent from '@/components/Events/CreateEvent'
import Event from '@/components/Events/Event'
import Profile from '@/components/Home/Profile'
import Signup from '@/components/Home/Signup'
import Dashboard from '@/components/Dashboard/Dashboard'
import Floorplan from '@/components/Floorplan/Floorplan'
import Monitor from '@/components/Monitor/Monitor'
import Participant from '@/components/Participant/Participant'
import AuthGuard from './AuthGuard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/download',
      name: 'Download',
      component: Download
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
      beforeEnter: AuthGuard
    },
    {
      path: '/event/new',
      name: 'CreateEvent',
      component: CreateEvent
    },
    {
      path: '/events/:id',
      name: 'Event',
      props: true,
      component: Event
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/floorplan',
      name: 'Floorplan',
      component: Floorplan
    },
    {
      path: '/monitor',
      name: 'Monitor',
      component: Monitor
    },
    {
      path: '/participant',
      name: 'Participant',
      component: Participant
    }
  ],
  mode: 'history'
})
