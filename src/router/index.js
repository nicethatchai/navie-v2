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
import Dashboard from '@/components/EventDetails/Dashboard'
import Floorplan from '@/components/EventDetails/Floorplan'
import Monitor from '@/components/EventDetails/Monitor'
import Participant from '@/components/EventDetails/Participant'
import AuthGuard from './AuthGuard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    // {
    //   path: '/dashboard',
    //   name: 'Dashboard',
    //   component: Dashboard
    // },
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
      component: Event,
      children: [
        {
          path: '/events/:id/dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/events/:id/floorplan',
          name: 'Floorplan',
          component: Floorplan
        },
        {
          path: '/events/:id/monitor',
          name: 'Monitor',
          component: Monitor
        },
        {
          path: '/events/:id/participant',
          name: 'Participant',
          props: true,
          component: Participant
        }
      ]
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    
  ],
  mode: 'history'
})
