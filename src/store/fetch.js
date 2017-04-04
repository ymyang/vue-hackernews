import Firebase from 'firebase/app'
import 'firebase/database'

const config = {
  databaseURL: 'https://hacker-news.firebaseio.com'
}
const version = '/v0'

Firebase.initializeApp(config)
const api = Firebase.database().ref(version)

// import Vue from 'vue'
// import VueResource from 'vue-resource'

// Vue.use(VueResource);

// const baseURL = 'http://127.0.0.1/v0'

// Vue.http.options.root = baseURL;

function fetch (child) {
  return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        resolve(val)
      }, reject)
    // Vue.http.get(child).then(response => {
    //   if (response.status == 200) {
    //     resolve(response.data)
    //   } else {
    //     reject(response)
    //   }
    // }, reject)
  })
}

export function fetchIdsByType (type) {
  return fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}