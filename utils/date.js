var d = new Date()

const date = {
  getNowDate: () => {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  },
  getUrlDate: () => {
    var month = d.getMonth() + 1
    var date = d.getDate() - 1
    month = month > 10 ? month : `0${month}`
    date = date > 10 ? date : `0${date}`
    return `${d.getFullYear()}${month}${date}`
  },
  getLastDate: () => {
    d = new Date(d.getTime() - 24*60*60*1000)
  },
  getTomDate: () => {
    d = new Date(d.getTime() + 24*60*60*1000)
  }
}

export default date