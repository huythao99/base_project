import * as React from 'react';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Path} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  path: string;
}

export default function AnimatedStroke(props: Props) {
  const progress = useSharedValue(0);

  const pathProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: 300 - 300 * progress.value,
    };
  });

  React.useEffect(() => {
    progress.value = withTiming(1, {duration: 3000});
  }, [progress]);

  return (
    <AnimatedPath
      animatedProps={pathProps}
      d={props.path}
      strokeWidth="2"
      strokeDasharray={300}
    />
  );
}
