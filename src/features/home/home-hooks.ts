import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

export type ItemTypes = {
  id: string;
  value: number;
};

const URL =
  'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsfGVufDB8fDB8fA%3D%3D&w=1000&q=80';

const ARRAY = new Array(250).fill(0).map((_, index) => {
  return {
    id: `${index}`,
    value: index + 1,
  };
});

export default function useHome() {
  const scrollY = useSharedValue(0);
  const currentScrollY = useSharedValue(0);
  const velocity = useSharedValue(0);
  const distance = useDerivedValue(() => {
    return Math.max(0, scrollY.value - currentScrollY.value);
  });

  const onScroll = useAnimatedScrollHandler({
    onMomentumBegin: event => {
      velocity.value = event.velocity?.y || 0;
      if (event.velocity?.y > 0) {
        if (distance.value > 0) {
          currentScrollY.value = scrollY.value - 100;
        }
      } else {
        if (distance.value === 0) {
          currentScrollY.value = event.contentOffset.y;
        }
      }
    },
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const styleImage = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            distance.value,
            [0, 100],
            [0, -150],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return {
    URL,
    ARRAY,
    styleImage,
    onScroll,
  };
}
