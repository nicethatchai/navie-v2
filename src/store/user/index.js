import * as firebase from 'firebase'

export default {
  state: {
    user: null,
  },
  mutations: {
        setUser (state, payload) {
            state.user = payload
        },
    },
  actions: {
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
    },
  getters: {
     user (state) {
            return state.user
        },
    }
}
