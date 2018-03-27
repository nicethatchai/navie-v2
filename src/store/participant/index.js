import * as firebase from 'firebase'

export default {
  state: {
    loadedParts: []
  },
  mutations: {
    setLoadedParts (state, payload) {
        state.loadedParts = payload
    },
    createPart (state, payload) {
        state.loadedParts.push(payload)
    }
    },
  actions: {
        loadedParts ({commit}, payload) {
            // console.log(payload.id) works
            commit('setLoading', true)
            firebase.database().ref('events').child(payload.id).child('registers').once('value')
            .then((data) => {
                const parts = []
                const obj = data.val()
                for(let key in obj) {
                    // if(obj[key].creatorId===this.state.user.id) {
                        parts.push({
                            id: key,
                            active: obj[key].active,
                            x: obj[key].x,
                            y: obj[key].y,
                        })
                    // }
                }
                // console.log(parts)
                commit('setLoadedParts', parts)
                commit('setLoading', false)
            })
            .catch((error) => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        createPart ({commit, getters}, payload) {
            const part = {
                age: payload.age,
                gender: payload.gender,
                name: payload.name,

            }
            firebase.database().ref('events').child(payload.id).child('registers').push(part)
            .then((data) => {
                const key = data.key
                commit('createPart', {
                ...part,
                id: key
                })
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },
  getters: {
        loadedParts (state) {
            return state.loadedParts.sort((eventA, eventB) => {
                return eventA.date > eventB.date
            })
        },
        loadedPart (state) {
            return (eventId) => {
                return state.loadedEvents.find((event) => {
                    return event.id === eventId
                })
            }
        }
    }
  }
