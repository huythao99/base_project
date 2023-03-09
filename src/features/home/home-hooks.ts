import * as React from 'react';
import {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function useHome() {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(1, {duration: 3000});
  }, [progress]);

  const animationPropsFirst = useAnimatedProps(() => {
    return {
      rotation: 60,
    };
  });

  const animationPropsSecond = useAnimatedProps(() => {
    return {
      rotation: progress.value * 120,
    };
  });

  return {
    animationPropsFirst,
    animationPropsSecond,
  };
}
