import * as React from 'react';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {Path} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  path: string;
  progress: SharedValue<number>;
}

export default function AnimatedStroke(props: Props) {
  const ref = React.useRef<typeof AnimatedPath | undefined>(undefined);
  const [length, setLength] = React.useState(0);

  const pathProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: length - length * props.progress.value,
    };
  });

  return (
    <AnimatedPath
      onLayout={() => {
        setLength(ref?.current?.getTotalLength() || 0);
      }}
      animatedProps={pathProps}
      ref={ref}
      d={props.path}
      stroke="black"
      strokeWidth="2"
      mask="url(#Path-1-outside-1_1_6)"
      strokeDasharray={length}
      //   strokeDashoffset={length - length * 0.9}
    />
  );
}
