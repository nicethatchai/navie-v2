import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedEvents: [],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedEvents (state, payload) {
            state.loadedEvents = payload
        },
        createEvent (state, payload) {
            state.loadedEvents.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        loadedEvents ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('events').once('value')
            .then((data) => {
                const events = []
                const obj = data.val()
                for(let key in obj) {
                    events.push({
                        id: key,
                        title: obj[key].title,
                        location: obj[key].location,
                        date: obj[key].date,
                        description: obj[key].description,
                        imageUrl: obj[key].imageUrl,
                        creatorId: obj[key].creatorId
                    })
                }
                commit('setLoadedEvents', events)
                commit('setLoading', false)
            })
            .catch((error) => {
                console.log(error)
                commit('setLoading', true)
            })
        },
        createEvent ({commit, getters}, payload) {
            const event = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                creatorId: getters.user.id
            }
            // reach to firebase
            firebase.database().ref('events').push(event)
            .then((data) => {
                const key = data.key
                commit('createEvent',{ 
                ...event,
                id: key
                })
            })
            .catch((error) => {
                console.log(error)
            })
        },
        signUserUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            registeredEvents: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError',  error)
                        console.log(error)
                    }
                )
        },
        signUserIn ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            registeredEvents: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError',  error)
                        console.log(error)
                    }
                )
        },
        autoSignin ({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredEvents: []})
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError ({commit}) {
            commit('clearError')
        }

    },
    getters:{
        loadedEvents (state) {
            return state.loadedEvents.sort((eventA, eventB) => {
                return eventA.date > eventB.date
            })
        },
        loadedEvent (state) {
            return (eventId) => {
                return state.loadedEvents.find((event) => {
                    return event.id === eventId
                })
            }
        },
        user (state) {
            return state.user
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
})