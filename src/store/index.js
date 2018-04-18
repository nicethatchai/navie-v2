import Vue from 'vue'
import Vuex from 'vuex'

import event from './event'
import user from './user'
import shared from './shared'
import part from './participant'
import floorplan from './floorplan'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    event: event,
    user: user,
    shared: shared,
    part: part,
    floorplan,
  }
})