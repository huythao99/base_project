import {Dimensions, Platform, PixelRatio} from 'react-native';
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

const WIDTH_FIGMA = 400;
const HEIGHT_FIGMA = 700;
const scale = WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function calculateWidth(width: number) {
  return (WIDTH * width) / WIDTH_FIGMA;
}

export function calculateHeight(height: number) {
  return (HEIGHT * height) / HEIGHT_FIGMA;
}
