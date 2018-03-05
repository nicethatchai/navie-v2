import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedEvents: [],
        loadedGraphs: [],
        loadedMaps: [],
        loadedFloorplan: [],
        loadParts: [],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        // setLoadedParts (state, payload) {
        //     state.loadParts = payload
        // },
        // createPart (state, payload) {
        //     state.loadParts.push(payload)
        // },
        setLoadedEvents (state, payload) {
            state.loadedEvents = payload
        },
        createEvent (state, payload) {
            state.loadedEvents.push(payload)
        },
        updateEvent (state, payload) {
            const event = state.loadedEvents.find(event => {
                return event.id === payload.id
            })
            if (payload.title) {
                event.title = payload.title
            }
            if (payload.description) {
                event.description = payload.description
            }
            if (payload.date) {
                event.date = payload.date
            }
            if (payload.location) {
                event.location = payload.location
            }
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
        // loadedParts ({commit, getters}) {

        //     console.log('/events/' + this.eventId + '/registers/')
        //     firebase.database().ref('/events/' + this.eventId + '/registers/').once('value')
        //     .then((data) => {
        //         const parts = []
        //         const obj = data.val()
        //         for(let key in obj) {
        //             parts.push({
        //                 id: key,
        //                 name: obj[key].name,
        //                 gender: obj[key].gender,
        //                 dob: obj[key].dob,
        //             })
        //         }
        //         console.log(parts)
        //         commit('setLoadedParts', parts)
        //         commit('setLoading', false)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //         commit('setLoading', false)
        //     })
        // },
        // createPart ({commit}, payload) {
        //     const part = {
        //         name: payload.name,
        //         gender: payload.gender,
        //         dob: payload.dob,
        //     }
        //     let key
        //     firebase.database().ref('/events/' + eventId + '/registers/').push(event)
        //     .then((data) => {
        //         const key = data.key
        //         commit('createPart',{ 
        //         ...part,
        //         id: key
        //         })
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        // },

        loadedEvents ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('events').once('value')
            .then((data) => {
                const events = []
                const obj = data.val()
                for(let key in obj) {
                    if(obj[key].creatorId===this.state.user.id) {
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
            const event = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date,
                creatorId: getters.user.id

            }
            let imageUrl
            let key
            
            firebase.database().ref('events').push(event)
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
        updateEventData ({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.location) {
                updateObj.location = payload.location
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('events').child(payload.id).update(updateObj)
                .then(() => {
                    commit('setLoading', flase)
                    commit('updateEvent', payload)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
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
                            id: user.uid
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
        },
        signUserIn ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid
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
            commit('setUser', {id: payload.uid})
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