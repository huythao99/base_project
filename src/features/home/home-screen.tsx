import {
  Canvas,
  Circle,
  Oval,
  Group,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import * as React from 'react';
import {BLUE_50, BLUE_A200, BLUE_A400} from '../../constants/colors';
import useHome from './home-hooks';
import styles from './styles';

export default function HomeScreen() {
  const {
    center,
    rotationTransform,
    rotationTransformSecond,
    rotationTransformLogo,
  } = useHome();

  return (
    <Canvas style={styles.container}>
      <Circle cx={center.x} cy={center.y} r={15} color="lightblue">
        <SweepGradient c={vec(center.x, center.y)} colors={[BLUE_A200]} />
      </Circle>
      <Group
        style={'stroke'}
        strokeWidth={10}
        transform={rotationTransformLogo}
        origin={center}>
        <SweepGradient
          c={vec(center.x, center.y)}
          colors={[BLUE_50, BLUE_A200, BLUE_A400]}
        />
        <Oval x={center.x - 150} y={center.y - 50} width={300} height={100} />
        <Group transform={rotationTransform} origin={center}>
          <Oval x={center.x - 150} y={center.y - 50} width={300} height={100} />
        </Group>
        <Group transform={rotationTransformSecond} origin={center}>
          <Oval x={center.x - 150} y={center.y - 50} width={300} height={100} />
        </Group>
      </Group>
    </Canvas>
  );
}
