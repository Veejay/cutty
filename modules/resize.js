const sharp = require('sharp')
const fs = require('fs')

let waitForFinish = writableStream => {
  return new Promise((resolve, reject) => {
    writableStream.on('close', event => {
      resolve(true)
    })
  })
}

const resize = () => {
  // IMPLICIT ZEAL.JPG
  // Specifying the target width while preserving the aspect ratio
  let pipeline = sharp()
  let sizes = [200, 400, 600, 800, 1200, 1920]
  let promises = sizes.map(size => {
    var s = fs.createWriteStream(`uploads/${size}.jpg`)
    pipeline.clone().resize(size).pipe(s)
    return waitForFinish(s)
  })
  Promise.all(promises).then(done => {
    console.log('Done')
  }).catch(console.error)
  // pipeline.clone().resize(1400).pipe()
  // pipeline.clone().resize(400).pipe(fs.createWriteStream('uploads/400.jpg'))
  // pipeline.clone().resize(200).pipe(fs.createWriteStream('uploads/200.jpg'))
  // pipeline.clone().resize(720).pipe(fs.createWriteStream('uploads/720.jpg'))
  // pipeline.clone().resize(600).pipe(fs.createWriteStream('uploads/600.jpg'))
  // pipeline.clone().resize(1920).pipe(fs.createWriteStream('uploads/1920.jpg'))
}

module.exports = { resize }
