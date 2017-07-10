const express = require('express')
const fs = require('fs')
const fetch = require('request').get

const { resize } = require('./modules/resize')


const app = express()

app.get('/resize/:name/:width', (request, response) => {
  console.log('Received a request')
  // Use a local file (might have been uploaded before)
  const readStream = fs.createReadStream(`./uploads/${request.params.name}`)
  // Use a remote file
  // const uri = 'https://www.wired.com/wp-content/uploads/2015/09/google-logo.jpg'
  // const readStream = fetch({ uri })
  // Getting the parameters from the request
  // Parameters are being transmitted as strings, convert to numbers
  const width = parseInt(request.params.width, 10)
  // Pipe the readStream to sharp, then pipe the result to the client
  readStream.pipe(resize())//// WHAT IS HAPPENING HERE
})

// Start the server
app.listen(4000, () => {
  console.log('Listening on port 3000')
})
