import * as React from 'react-native';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {User} from '../../../../types/user';
import styles from './styles';

interface Props {
  user: User;
}

function UserComponent(props: Props) {
  const valueOne = useSharedValue(1);
  const valueTwo = useSharedValue(0);

  const onClick = () => {
    if (valueOne.value === 0) {
      valueOne.value = withTiming(1, {duration: 500});
      valueTwo.value = withTiming(0, {duration: 500});
    } else {
      valueOne.value = withTiming(0, {duration: 500});
      valueTwo.value = withTiming(1, {duration: 500});
    }
  };

  const styleOne = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${(valueOne.value - 1) * 180}deg`,
        },
      ],
      opacity: valueOne.value,
    };
  });

  const styleTwo = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${(valueTwo.value - 1) * 180}deg`,
        },
      ],
      opacity: valueTwo.value,
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onClick}>
      <Animated.View style={[styles.child, styleOne]}>
        <Image source={{uri: props.user.avatar}} style={styles.avatar} />
        <Text style={styles.name}>
          {props.user.first_name} {props.user.last_name}
        </Text>
        <Text style={styles.job}>{props.user.employment.title}</Text>
      </Animated.View>
      <Animated.View style={[styles.childSecond, styleTwo]}>
        <Text style={styles.des}>{props.user.date_of_birth}</Text>
        <Text style={styles.des}>{props.user.credit_card.cc_number}</Text>
        <Text style={styles.des}>{props.user.phone_number}</Text>
        <Text style={styles.des}>{props.user.subscription.plan}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default UserComponent;
