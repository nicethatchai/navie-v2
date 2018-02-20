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
                commit('setLoading', false)
            })
        },
        createEvent ({commit, getters}, payload) {
            const eventt = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date,
                creatorId: getters.user.id

            }
            let imageUrl
            let key
            // reach to firebase
            firebase.database().ref('events').push(eventt)
            .then((data) => {
                key = data.key
                return key
            })
            .then(key => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                return firebase.storage().ref('events/' + key + '.' + ext).put(payload.image)
            })
            .then(fileData => {
                imageUrl = fileData.metadata.downloadURLs[0]
                return firebase.database().ref('events').child(key).update({imageUrl: imageUrl})
            })
            .then(() => {
                commit('createEvent',{ 
                ...event,
                imageUrl: imageUrl,
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
            
            // firebase.database().ref('users').
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            registeredEvents: []
                        }
                        firebase.database().ref('users/'+ newUser.id).set({
                            name:payload.name,
                            email: payload.email,
                            gender: payload.gender,
                            dob: payload.dob,
                        });
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
            // console.log(uid)
            // var cuser = firebase.auth().currentUser;
            // firebase.database().ref('users/'+ id).set(user);
            // console.log('Add user to firebase')
            // firebase.database().ref('users/' + newUser.id).push(user)
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