import Vue from 'vue'
import Vuex from 'vuex'

import event from './event'
import user from './user'
import shared from './shared'
import part from './participant'
<<<<<<< HEAD
import floorplan from './floorplan'
=======
>>>>>>> 63f5bdc00eea30b3a50e028fe1598e97ac807fbd

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    event: event,
    user: user,
    shared: shared,
<<<<<<< HEAD
    part: part,
    floorplan,
=======
    part: part
>>>>>>> 63f5bdc00eea30b3a50e028fe1598e97ac807fbd
  }
})