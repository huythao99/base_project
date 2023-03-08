import * as React from 'react';
import {Easing, useSharedValue, withTiming} from 'react-native-reanimated';

export default function useHome() {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(1, {duration: 4000, easing: Easing.linear});
  }, []);

  return {
    progress,
  };
}
