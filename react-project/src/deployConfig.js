const URL = {}

if(process.env.NODE_ENV === 'development'){

  URL.apiUrl = 'http://localhost'
  console.log('api-url', URL.apiUrl )

}
else{
  URL.apiUrl = 'https://rm-cortez.github.io'
}


URL.rootURL = 'https://rm-cortez.github.io/'
URL.passUrl =  '/react-project/'


export {URL}
