import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedEvents: [
            { imageUrl: 'https://www.ncl.com/sites/default/files/DestinationGalleries.Hawaii.SnorkelingBay900x400.jpg',
            id: '1',
            title: 'Hawaii',
            date: '2017-07-26',
            location: 'Hawaii',
            description: ''
            },
            { imageUrl: 'http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1492804659/soneva-jani-maldives-MALDIVES0421.jpg?itok=ZpxHJgMf',
            id: '2',
            title: 'Maldives',
            date: '2017-07-26',
            location: 'Maldives',
            description: ''
            },
            { imageUrl: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2017%2F12%2Fcopenhagen-best-places-travel-2018.jpg&w=800&q=85',
            id: '3',
            title: 'Denmark',
            date: '2017-07-26',
            location: 'Copenhagen',
            description: ''
            },
            { imageUrl: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2017%2F12%2Fmarrakech-best-places-travel-2018.jpg&w=800&q=85',
            id: '4',
            title: 'Morocco',
            date: '2017-07-26',
            location: 'Marrakesh',
            description: ''
            },
        ],
        user: {
            id: 'sdasdkal',
            registeredEvents: ['1','2']
        },
        loading: false,
        error: null
    },
    mutations: {
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
        createEvent ({commit}, payload) {
            const event = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date
            }
            // reach to firebase
            commit('createEvent', event)
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
        clearError ({commit}) {
            commit('clearError')
        }
    },
    getters:{
        loadedEvents (state) {
            return state.loadedEvents.sort((eventA,eventB) => {
                return eventA.date > eventB.date
            })
        },
        loadedEvent (state) {
            return (eventId) => {
                return state.loadedEvents.find((events) => {
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