// import * as firebase from 'firebase'

// export default {
//   state: {
//     loadedParts: []
//   },
//   mutations: {
//     setLoadedParts (state, payload) {
//         state.loadedParts = payload
//     },
//     createPart (state, payload) {
//         state.loadedParts.push(payload)
//     }
//     },
//   actions: {
//         loadedParts ({commit, getters}, payload) {
//             commit('setLoading', true)
//             console.log('Load participants')
//             console.log(payload)
//             firebase.database().ref('events').child(payload.id).child('registers').once('value')
//             .then((data) => {
//                 const parts = []
//                 const obj = data.val()
//                 for(let key in obj) {
//                         parts.push({
//                             id: key,
//                             name: obj[key].name,
//                             gender: obj[key].gender,
//                             age: obj[key].age,
//                         })
//                 }
//                 commit('setLoadedParts', parts)
//                 commit('setLoading', false)
//             })
//             .catch((error) => {
//                 console.log(error)
//                 commit('setLoading', false)
//             })
//         },
//         createPart ({commit, getters}, payload) {
//             const part = {
//                 age: payload.age,
//                 gender: payload.gender,
//                 name: payload.name,
//             }
//             firebase.database().ref('events').child(payload.id).child('registers').push(part)
//             // .then((data) => {
//             //     const key = data.key
//             //     commit('createPart', {
//             //     ...part,
//             //     id: key
//             //     })
//             // })
//             .catch((error) => {
//                 console.log(error)
//             })
//         },
//     },
//   getters: {
//         loadedParts (state) {
//             console.log('statingggggg')
//             return state.part.loadedParts
//         },
//         loadedPart (state) {
//             return (partId) => {
//                 return state.loadedParts.find((part) => {
//                     return part.id === partId
//                 })
//             }
//         },
//     }
//   }
