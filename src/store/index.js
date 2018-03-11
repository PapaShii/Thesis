import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/20171203_IU_Cheongju_Concert_%28cropped%29.jpg/1200px-20171203_IU_Cheongju_Concert_%28cropped%29.jpg',
        id: 'afajfjadfaadfa323',
        productName: 'bibi',
        productCode: '0AAS',
        productCategory: 'Chair',
        date: '2017-07-17'
      },
      {
        imageUrl: 'https://0.soompi.io/wp-content/uploads/2017/09/13145643/IU12.jpg',
        id: 'aadsfhbkhlk1241',
        productName: 'bebe',
        productCode: '324S',
        productCategory: 'Table',
        date: '2017-07-19'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateProduct (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.productName) {
        meetup.productName = payload.productName
      }
      if (payload.productCode) {
        meetup.productCode = payload.productCode
      }
      if (payload.productCategory) {
        meetup.productCategory = payload.productCategory
      }
      if (payload.description) {
        meetup.description = payload.description
      }
    },
    deleteProduct (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.key) {
        meetup.key = null
      }
      if (payload.id) {
        meetup.id = null
      }
      if (payload.productName) {
        meetup.productName = null
      }
      if (payload.productCode) {
        meetup.productCode = null
      }
      if (payload.productCategory) {
        meetup.productCategory = null
      }
      if (payload.description) {
        meetup.description = null
      }
      if (payload.imageUrl) {
        meetup.imageUrl = null
      }
      if (payload.date) {
        meetup.date = null
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
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              productName: obj[key].productName,
              productCode: obj[key].productCode,
              productCategory: obj[key].productCategory,
              imageUrl: obj[key].imageUrl,
              description: obj[key].description,
              date: obj[key].date
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', true)
          }
        )
    },
    createAccount ({commit, getters}, payload) {
      const account = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        accessLevel: payload.accessLevel,
        accountId: getters.user.id
      }
      firebase.database().ref('accounts').push(account)
        .then((data) => {
          console.log(data)
          commit('createAccount', account)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        productName: payload.productName,
        productCode: payload.productCode,
        productCategory: payload.productCategory,
        description: payload.description,
        date: payload.date.toISOString()
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateProductData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.productName) {
        updateObj.productName = payload.productName
      }
      if (payload.productCode) {
        updateObj.productCode = payload.productCode
      }
      if (payload.productCategory) {
        updateObj.productCategory = payload.productCategory
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj).then(() => {
        commit('setLoading', false)
        commit('updateProduct', payload)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    deleteProductData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.key) {
        updateObj.key = null
      }
      if (payload.id) {
        updateObj.id = null
      }
      if (payload.productName) {
        updateObj.productName = null
      }
      if (payload.productCode) {
        updateObj.productCode = null
      }
      if (payload.productCategory) {
        updateObj.productCategory = null
      }
      if (payload.description) {
        updateObj.description = null
      }
      if (payload.date) {
        updateObj.date = null
      }
      if (payload.imageUrl) {
        updateObj.imageUrl = null
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj).then(() => {
        commit('setLoading', false)
        commit('deleteProduct', payload)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
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
