import {
  useClockValue,
  useComputedValue,
  useValue,
  useValueEffect,
  interpolate,
  Extrapolate,
} from '@shopify/react-native-skia';
import {Dimensions} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function useHome() {
  const center = {x: WIDTH / 2, y: HEIGHT / 2};

  const clock = useClockValue();
  const rotation = useValue(0);
  const logo = useValue(0);

  const rotationTransform = useComputedValue(() => {
    return [{rotate: rotation.current}, {scale: -1}];
  }, [rotation]);

  const rotationTransformSecond = useComputedValue(() => {
    return [{rotate: -rotation.current}, {scale: -1}];
  }, [rotation]);

  const rotationTransformLogo = useComputedValue(() => {
    return [{rotate: logo.current}];
  }, [logo]);

  useValueEffect(clock, () => {
    rotation.current = interpolate(
      clock.current,
      [0, 1000],
      [0, Math.PI / 3],
      Extrapolate.CLAMP,
    );
    logo.current = interpolate(
      clock.current,
      [0, 1000, 2500],
      [0, 0, Math.PI / 2],
    );
  });

  return {
    center,
    rotationTransform,
    rotationTransformSecond,
    rotationTransformLogo,
  };
}
