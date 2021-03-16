"use strict"

module.exports = {

  sessionKey: '__r_s_sess_',

  config(options) {
    this.sessionKey = options.sessionKey || '__r_s_sess_';
  },

  get(key) {
    if (typeof(Storage) === "undefined") {
      // Sorry! No Web Storage support..
      throw new Error("No Web Storage support");
    }
    const session = JSON.parse(localStorage.getItem(this.sessionKey));
    if (session) {
      return session[key];
    } else {
      return undefined;
    }
  }

}
