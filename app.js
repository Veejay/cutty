const express = require('express')
const fs = require('fs')
const fetch = require('request').get

const { resize } = require('./modules/resize')


const app = express()

app.get('/resize/:name/:width-:height', (request, response) => {
  // Use a local file (might have been uploaded before)
  const readStream = fs.createReadStream(`./uploads/${request.params.name}`)
  // Use a remote file
  // const uri = 'https://b1304dd34a40bcce1277-44e68fdffc19088dedb2d91dd3f404ec.ssl.cf1.rackcdn.com/files/5841ac1eff39355f64d3498a/size_2_creer-son-site-avec-orson.png'
  // const readStream = fetch({uri})
  // Getting the parameters from the request
  const {width, height} = request.params
  // Parameters are being transmitted as strings, convert to numbers
  const dimensions = [width, height].map(dimension => {
    return parseInt(dimension, 10)
  })
  // Pipe the readStream to sharp, then pipe the result to the client
  readStream.pipe(resize(...dimensions)).pipe(response)
})

// Start the server
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
