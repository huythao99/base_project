import * as React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import useHome from './home-hooks';
import styles from './styles';

const FlatListAnimated = Animated.createAnimatedComponent(FlatList);
const ImageAnimated = Animated.createAnimatedComponent(Image);

export default function HomeScreen() {
  const {URL, ARRAY, styleImage, onScroll} = useHome();

  return (
    <View style={styles.container}>
      <FlatListAnimated
        onScroll={onScroll}
        data={ARRAY}
        renderItem={({item}) => {
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.itemContent}>{item.value}</Text>
            </View>
          );
        }}
        ListHeaderComponent={<View style={styles.blank} />}
      />
      <ImageAnimated style={[styles.image, styleImage]} source={{uri: URL}} />
    </View>
  );
}
