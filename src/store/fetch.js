import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

const baseURL = 'https://hacker-news.firebaseio.com/v0'

Vue.http.options.root = baseURL;

function fetch (path) {
  return Vue.http.get(`${path}.json`).then(response => {
      return response.json()
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
