import * as firebase from 'firebase'

export default {
  state: {
    loadedEvents: []
  },
  mutations: {
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
    },
  actions: {
        loadedEvents ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('events').once('value')
            .then((data) => {
                const events = []
                const obj = data.val()
                for(let key in obj) {
                    // if(obj[key].creatorId===this.state.user.id) {
                        events.push({
                            id: key,
                            title: obj[key].title,
                            location: obj[key].location,
                            date: obj[key].date,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            creatorId: obj[key].creatorId,
                            // participants:  obj[key].participants,
                            // register: obj[key].registers
                        })
                    // }
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
<<<<<<< HEAD
            console.log(payload)
=======
>>>>>>> 63f5bdc00eea30b3a50e028fe1598e97ac807fbd
            const event = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date,
                creatorId: getters.user.id

            }
            let imageUrl
<<<<<<< HEAD
            let floorplanUrl
=======
>>>>>>> 63f5bdc00eea30b3a50e028fe1598e97ac807fbd
            let key
            
            firebase.database().ref('events').push(event)
            .then((data) => {
                key = data.key
                return key
            })
            .then(key => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
<<<<<<< HEAD
                return firebase.storage().ref('events/' + key + '.' + ext).put(payload.image) 
=======
                return firebase.storage().ref('events/' + key + '.' + ext).put(payload.image)
>>>>>>> 63f5bdc00eea30b3a50e028fe1598e97ac807fbd
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
    },
  getters: {
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
        }
    }
  }
