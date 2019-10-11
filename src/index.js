"use strict"

const storage = require('./storage')

module.exports = {

  get(url, options) {
    return this.request({method: 'GET', url, options})
  },

  post(url, data, options) {
    if (options) {
      if (!options.header) { options.header = {} }
      options.header['Content-Type'] = 'application/json'
    } else {
      options = { header: { 'Content-Type' : 'application/json' } }
    }
    return this.request({ method: 'POST', url, data, options })
  },

  request({method, url, data, header, options}) {
    return new Promise( (resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open(method, url, true)
      if (options && options.header) {
        for (let prop in options.header) {
          request.setRequestHeader(prop, options.header[prop])
        }
      }
      if (options && options.authen && storage.get('token')) {
        request.setRequestHeader('Authorization', `Bearer ${storage.get('token')}`)
      }
      const to = (options && options.timeout)?  setTimeout(() => reject('timeout'), options.timeout) : null
      request.addEventListener('load', () => {
        to && clearTimeout(to)
        const {status, responseText} = request
        resolve({status, responseText})
      })
      if (data) {
        request.send(JSON.stringify(data))
      } else {
        request.send()
      }
    })
  }

}
