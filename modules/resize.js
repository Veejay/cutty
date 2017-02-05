const sharp = require('sharp')

const resize = (width, height) => {
  console.log(`Resizing image to ${width}x${height}`)
  // Specifying the target width while preserving the aspect ratio
  return sharp().resize(width)
}

module.exports = { resize }