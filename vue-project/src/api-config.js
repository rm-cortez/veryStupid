let URL = {}


if(process.env.NODE_ENV == 'development'){

  URL.apiUrl = 'http://localhost'
  console.log('apiUrl: ', URL.apiUrl)

}
else{
  URL.apiUrl = 'http://rcsproductions.us'
}

export {URL}
