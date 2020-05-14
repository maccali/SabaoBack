const validDate = (date) => {
  var matches = /(\d{4})[-](\d{2})[-](\d{2})/.exec(date)
  if (matches == null) {
    throw new Error('Invalid Date (YYYY-MM-DD)')
  }
  var dia = matches[3]
  var mes = matches[2] - 1
  var ano = matches[1]
  var data = new Date(ano, mes, dia)
  return (
    data.getDate() == dia && data.getMonth() == mes && data.getFullYear() == ano
  )
}

const validDateAndPast = (date) => {
  let tDate = date
  if (validDate(date)) {
    let arrDate = tDate.split('-')
    let date = new Date(arrDate[0], arrDate[1] - 1, arrDate[2])
    let today = new Date()
    return date < today
  } else {
    throw new Error('Invalid Date (YYYY-MM-DD)')
  }
}

exports.validDateAndPast = validDateAndPast
