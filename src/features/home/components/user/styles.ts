import {StyleSheet} from 'react-native';
import {BLACK} from '../../../../constants/colors';
import {
  calculateHeight,
  calculateWidth,
  normalize,
} from '../../../../constants/dimensions';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: calculateWidth(16),
    paddingVertical: calculateHeight(8),
    borderRadius: calculateWidth(8),
    flex: 1,
    borderWidth: 1,
    marginHorizontal: calculateWidth(5),
    marginVertical: calculateHeight(3),
  },
  child: {
    flex: 1,
  },
  childSecond: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: calculateWidth(15),
    top: calculateHeight(9),
  },
  avatar: {
    width: '100%',
    height: calculateHeight(180),
    resizeMode: 'cover',
  },
  name: {
    fontWeight: 'bold',
    fontSize: normalize(13),
    color: BLACK,
    marginVertical: calculateHeight(4),
  },
  job: {
    fontWeight: '500',
    fontSize: normalize(12),
  },
  des: {
    fontWeight: '500',
    fontSize: normalize(12),
    marginVertical: calculateHeight(4),
  },
});

export default styles;
