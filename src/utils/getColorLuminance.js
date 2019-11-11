import colorLuminance from 'color-luminance'

/* Utility function to convert an HEX color into the RGB format */
const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/* Returns the luminance (in a 0-255 range) of a color in the HEX format */
const getColorLuminance = hexColor => {
  const rgbValue = hexToRgb(`#${hexColor}`)

  return colorLuminance(rgbValue.r, rgbValue.g, rgbValue.b)
}

export default getColorLuminance
