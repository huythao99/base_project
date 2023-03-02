import {StyleSheet} from 'react-native';
import {GREY_700, RED_500, TRANSPARENT, WHITE} from '../../constants/colors';
import {calculateWidth, HEIGHT, WIDTH} from '../../constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TRANSPARENT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 3,
    width: WIDTH,
    backgroundColor: GREY_700,
  },
  circleOut: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: -14,
    left: -10,
    zIndex: 100,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: RED_500,
  },
  redLine: {
    height: 3,
    width: WIDTH,
    backgroundColor: RED_500,
    position: 'absolute',
  },
  backgroundVideo: {
    width: WIDTH,
    height: (WIDTH * 3) / 4,
  },
  backgroundVideoLandScape: {
    height: WIDTH,
    width: HEIGHT,
  },
  config: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  configRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    marginHorizontal: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    color: WHITE,
    fontSize: 13,
    paddingHorizontal: calculateWidth(5),
  },
  configBottom: {
    width: WIDTH,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  duration: {
    color: WHITE,
    fontSize: 13,
  },
  bottomConfigRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: calculateWidth(15),
  },
});

export default styles;
