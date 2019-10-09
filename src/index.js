"use strict"

const storage = require('./storage')

module.exports = {
  get(url, options) {
    return new Promise( (resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open('GET', url, true)
      if (options && options.authen && storage.get('token')) {
        request.setRequestHeader('Authorization', `Bearer ${storage.get('token')}`)
      }
      const to = (options && options.timeout)?  setTimeout(() => reject('timeout'), options.timeout) : null
      request.addEventListener('load', () => {
        to && clearTimeout(to)
        resolve(request.status, request.responseText)
      })
      request.send()
    })
  }
}
