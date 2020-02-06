const convertToHex = str => {

  // convert to hex
  let result = ''
  for (let i = 0; i < str.length; i++) {
    let hex = str.charCodeAt(i).toString(16)
    result += hex.slice(-4)
  }

  // split the hex into pairs of 6
  let splitHex = result.match(/.{1,6}/g)

  // remove anything that isn't 6 characters long
  splitHex.forEach(hex => {
    if (hex.length < 6) splitHex.splice(splitHex.indexOf(hex), 1)
  })

  // combine arrays
  const combinedColor = combineColors(splitHex)

  // display the combined color
  let canvas = document.getElementById("combined-color-canvas")
  let ctx = canvas.getContext('2d')
  ctx.fillStyle = combinedColor
  ctx.fillRect(0, 0, 200, 200)
}

// stolen from https://coderwall.com/p/z8uxzw/javascript-color-blender
const blendColors = (color1, color2) => {
  const percentage = 0.5

  // convert colors to rgb
  color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)]
  color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)]

  // blend
  let color3 = [
    (1 - percentage) * color1[0] + percentage * color2[0],
    (1 - percentage) * color1[1] + percentage * color2[1],
    (1 - percentage) * color1[2] + percentage * color2[2]
  ]

  // convert to hex
  color3 = intToHex(color3[0]) + intToHex(color3[1]) + intToHex(color3[2])

  return color3
}

const intToHex = (num) => {
  let hex = Math.round(num).toString(16)
  if (hex.length == 1) hex = '0' + hex

  return hex
}

const combineColors = (arr) => {
  if (arr.length === 1) return arr;

  let combinedArr = []
  for (let i = 0; i < arr.length - 1; i++) {
    combinedArr.push(blendColors(arr[i], arr[i + 1]))
  }

  return combineColors(combinedArr)
}