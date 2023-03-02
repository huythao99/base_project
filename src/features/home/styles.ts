import {StyleSheet} from 'react-native';
import {WIDTH} from '../../constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: WIDTH,
    height: 300,
    position: 'absolute',
    top: 0,
  },
  blank: {
    width: WIDTH,
    height: 300,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  itemContent: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default styles;
