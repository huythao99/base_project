import {StyleSheet} from 'react-native';
import {RED_A400, WHITE} from '../../constants/colors';
import {
  calculateHeight,
  calculateWidth,
  normalize,
} from '../../constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingVertical: calculateHeight(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: calculateHeight(4),
  },
  button: {
    paddingVertical: calculateHeight(4),
    paddingHorizontal: calculateWidth(12),
    backgroundColor: RED_A400,
    borderRadius: calculateWidth(4),
  },
  textButton: {
    fontSize: normalize(15),
    fontWeight: 'bold',
    color: WHITE,
  },
  flatList: {
    flex: 1,
  },
});

export default styles;
