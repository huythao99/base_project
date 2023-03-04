import {StyleSheet} from 'react-native';
import {WIDTH} from '../../constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: WIDTH,
    height: 150,
    top: 0,
    position: 'absolute',
  },
  blank: {
    width: WIDTH,
    height: 150,
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
