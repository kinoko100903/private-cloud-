const wss = window.sessionStorage

export const sessionStorage = {
  setItem: function (key, val) {
    wss.setItem(key, JSON.stringify(val))
  },
  getItem: function (key) {
    try {
      return JSON.parse(wss.getItem(key))
    } catch (err) {
      return null
    }
  },
  clear: function () {
    wss.clear()
  },
  keys: function (index) {
    return wss.key(index)
  },
  removeItem: function (key) {
    wss.removeItem(key)
  }
}
