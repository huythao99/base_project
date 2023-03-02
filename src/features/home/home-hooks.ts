/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {BackHandler, LayoutChangeEvent} from 'react-native';
import {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import Orientation, {OrientationType} from 'react-native-orientation-locker';

export default function useHome() {
  const refVideo = useRef<any | null>(null);
  const [isGesture, setIsGesture] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  const [landScapeMode, setLandScapeMode] = useState(false);

  const showOptions = useSharedValue(0);
  const translateX = useSharedValue(0);
  const originX = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const maxDuration = useSharedValue(0);
  const currentDuration = useSharedValue(0);
  const maxWidth = useSharedValue(0);
  const maxHeight = useSharedValue(0);

  const textDuration = useDerivedValue(() => {
    const minute = Math.floor(maxDuration.value / 60);
    const second = Math.floor(maxDuration.value - 60 * minute);
    const minuteCurrent = Math.floor(currentDuration.value / 60);
    const secondCurrent = Math.floor(
      currentDuration.value - 60 * minuteCurrent,
    );
    return `${minuteCurrent >= 10 ? minuteCurrent : '0' + minuteCurrent}:${
      secondCurrent >= 10 ? secondCurrent : '0' + secondCurrent
    }/${minute >= 10 ? minute : '0' + minute}:${
      second >= 10 ? second : '0' + second
    }`;
  }, [maxDuration, currentDuration]);

  const onPanGestureEvent = Gesture.Pan()
    .onStart(() => {
      originX.value = translateX.value;
      scale.value = withTiming(1.2);
      runOnJS(setIsPlay)(false);
    })
    .onChange(e => {
      translateX.value = Math.max(
        0,
        Math.min(originX.value + e.translationX, maxWidth.value),
      );
      currentDuration.value =
        (translateX.value / maxWidth.value) * maxDuration.value;
      runOnJS(setIsGesture)(true);
    })
    .onEnd(() => {
      scale.value = withTiming(0.8);
      runOnJS(setIsGesture)(false);
      runOnJS(setIsPlay)(true);
    });

  const onSingleTap = Gesture.Tap()
    .numberOfTaps(1)
    .maxDuration(250)
    .onStart(() => {
      showOptions.value = withTiming(1);
    });

  const onDoubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onStart(() => {
      showOptions.value = withTiming(0);
    });

  const styleConfig = useAnimatedStyle(() => {
    return {
      opacity: showOptions.value,
    };
  }, []);

  const styleCircle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  }, []);

  const styleRedLine = useAnimatedStyle(() => {
    return {
      width: translateX.value,
    };
  }, []);

  const styleLine = useAnimatedStyle(() => {
    return {
      width: maxWidth.value,
    };
  }, []);

  const onInitMaxDuration = (duration: number) => {
    maxDuration.value = duration;
  };

  const onChangeDuration = (duration: number) => {
    currentDuration.value = duration;
    translateX.value = (duration / maxDuration.value) * maxWidth.value;
  };

  const onNextDuration = () => {
    cancelAnimation(showOptions);
    if (Math.floor(currentDuration.value) === Math.floor(maxDuration.value)) {
      return;
    }
    refVideo.current?.seek(
      Math.min(currentDuration.value + 10, maxDuration.value),
    );
    currentDuration.value = Math.min(
      currentDuration.value + 10,
      maxDuration.value,
    );
    translateX.value = withTiming(
      (Math.min(currentDuration.value + 10, maxDuration.value) /
        maxDuration.value) *
        maxWidth.value,
    );
    originX.value =
      (Math.min(currentDuration.value + 10, maxDuration.value) /
        maxDuration.value) *
      maxWidth.value;
  };

  const onPrevDuration = () => {
    cancelAnimation(showOptions);

    if (Math.floor(currentDuration.value) === 0) {
      return;
    }
    refVideo.current?.seek(Math.max(0, currentDuration.value - 10));
    currentDuration.value = Math.max(0, currentDuration.value - 10);
    translateX.value = withTiming(
      (Math.max(0, currentDuration.value - 10) / maxDuration.value) *
        maxWidth.value,
    );
    originX.value =
      (Math.max(0, currentDuration.value - 10) / maxDuration.value) *
      maxWidth.value;
  };

  const onSeek = (duration: number) => {
    refVideo.current?.seek(duration);
  };

  const onRotate = async () => {
    cancelAnimation(showOptions);
    // if (Orientation.) {
    //   Orientation.lockToLandscapeLeft();
    // } else {
    //   Orientation.lockToPortrait();
    // }
    Orientation.getOrientation((orientation: Orientation) => {
      if (
        orientation === OrientationType['LANDSCAPE-LEFT'] ||
        orientation === OrientationType['LANDSCAPE-RIGHT']
      ) {
        Orientation.lockToPortrait();
      } else {
        Orientation.lockToLandscapeLeft();
      }
    });
  };

  const onChangeLayout = (event: LayoutChangeEvent) => {
    maxWidth.value = event.nativeEvent.layout.width;
    maxHeight.value = event.nativeEvent.layout.height;
  };

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // StatusBar.setHidden(true);

    Orientation.lockToPortrait();

    Orientation.addOrientationListener((orientation: OrientationType) => {
      if (
        orientation === OrientationType['LANDSCAPE-LEFT'] ||
        orientation === OrientationType['LANDSCAPE-RIGHT']
      ) {
        setLandScapeMode(true);
      } else {
        setLandScapeMode(false);
      }
    });

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (!isGesture) {
      onSeek(currentDuration.value);
    }
  }, [isGesture]);

  return {
    landScapeMode,
    refVideo,
    textDuration,
    styleCircle,
    styleConfig,
    styleRedLine,
    onPanGestureEvent,
    onSingleTap,
    onDoubleTap,
    isPlay,
    styleLine,
    onRotate,
    onNextDuration,
    onPrevDuration,
    onChangeDuration,
    onInitMaxDuration,
    onChangeLayout,
  };
}
