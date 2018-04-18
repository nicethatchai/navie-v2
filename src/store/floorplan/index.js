import * as firebase from 'firebase'

export default {
  state: {
    // loadedFloorplan: []
  },
  mutations: {
  //   setLoadedEvents (state, payload) {
  //     state.loadedEvents = payload
  // },
  //   addFloorplan (state, payload) {
  //     state.loadedFloorplan.push(payload)
  // },
  //   },
  },
  actions: {
        addFloorplan ({commit, getters}, payload) {
          console.log(payload)
            const id = payload.id
            let floorplanUrl
    
            const filename = payload.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            firebase.storage().ref('Floorplans/' + id + '.' + ext).put(payload.image)
            .then(fileData => {
                floorplanUrl = fileData.metadata.downloadURLs[0]
                return firebase.database().ref('events').child(id).update({floorplanUrl: floorplanUrl})
            })
            // .then(() => {
            //     commit('addFloorplan',{ 
            //     floorplanUrl: floorplanUrl,
            //     id: key
            //     })
            // })
            .catch((error) => {
                console.log(error)
            })
        },
    },
  getters: {
          }
  }
