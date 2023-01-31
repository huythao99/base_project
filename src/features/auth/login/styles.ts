import {StyleSheet} from 'react-native';
import {WHITE} from '../../../constants/colors';
import {normalize} from '../../../constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  title: {
    fontSize: normalize(14),
  },
});

export default styles;
