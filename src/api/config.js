export function baseUrl () {
  if (process.env.VUE_APP_CORS === 'true') {
    console.log('process.env.VUE_APP_CORS', process.env.VUE_APP_CORS === 'true')
    return ''
  } else {
    console.log(
      'process.env.VUE_APP_CORS',
      process.env.VUE_APP_CORS === 'true'
    )
    console.log('process.env.VUE_APP_URL=', process.env.VUE_APP_URL)
    return process.env.VUE_APP_URL
  }
}
