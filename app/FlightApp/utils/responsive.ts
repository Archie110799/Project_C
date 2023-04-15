import {Dimensions, Platform} from 'react-native';
import {WIDTH_DEVICE_FONT, WIDTH_DEVICE, HEIGHT_DEVICE} from '../config/env'

const {width: DEVICE_SCREEN_WIDTH, height: DEVICE_SCREEN_HEIGHT} =
  Dimensions.get(Platform.select({ios: 'screen', android: 'window'}));

const DESIGN_SCREEN_WIDTH_FONT = WIDTH_DEVICE_FONT;
const DESIGN_SCREEN_WIDTH = WIDTH_DEVICE;
const DESIGN_SCREEN_HEIGHT = HEIGHT_DEVICE;

const widthFontPercent = DEVICE_SCREEN_WIDTH / DESIGN_SCREEN_WIDTH_FONT;
const widthPercent = DEVICE_SCREEN_WIDTH / DESIGN_SCREEN_WIDTH;
const heightPercent = DEVICE_SCREEN_HEIGHT / DESIGN_SCREEN_HEIGHT;

function getWidth(designWidth: number) {
  const result = designWidth * widthPercent;
  return Number(result.toFixed(0));
}

function getHeight(designHeight: number) {
  const result = designHeight * heightPercent;
  return Number(result.toFixed(0));
}

function getFont(designWidth: number) {
  const result = designWidth * widthFontPercent;
  return Number(result.toFixed(0));
}

export const responsive = {
  getWidth,
  getHeight,
  getFont,
  WIDTH: DEVICE_SCREEN_WIDTH,
  HEIGHT: DEVICE_SCREEN_HEIGHT,
};
