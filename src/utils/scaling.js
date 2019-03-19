// Taken from react-native-size-matters mini library for scaling to other devices
// https://github.com/nirsky/react-native-size-matters/blob/master/lib/scalingUtils.js
// Date Taken: Tuesday March 13, 2018
import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window')
console.log("scaling width: " + width + " scaling height: " + height)

// We will base our scale off
const BASE_WIDTH = 600;
const BASE_HEIGHT = 888; //912

let currentWidth = height>width ? width : height;
let currentHeight = height>width ? height : width;

console.log("scaling currentWidth: " + currentWidth + " scaling currentHeight: " + currentHeight)

const scale = (size) => currentWidth / BASE_WIDTH * size;
const verticalScale = (size) => currentHeight / BASE_HEIGHT * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const set_W_H = (W,H) => {
    currentWidth = W;
    currentHeight = H;
    console.log("setting current W,H: " + W + "," + H)
}

export {set_W_H, scale, verticalScale, moderateScale};