import * as React from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import useHome from './home-hooks';
import styles from './styles';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {ReText} from 'react-native-redash';

export default function HomeScreen() {
  const {
    refVideo,
    textDuration,
    styleCircle,
    styleConfig,
    styleRedLine,
    onPanGestureEvent,
    onSingleTap,
    onDoubleTap,
    isPlay,
    landScapeMode,
    styleLine,
    onRotate,
    onChangeDuration,
    onInitMaxDuration,
    onNextDuration,
    onPrevDuration,
    onChangeLayout,
  } = useHome();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <GestureDetector gesture={Gesture.Exclusive(onDoubleTap, onSingleTap)}>
        <Animated.View
          onLayout={onChangeLayout}
          style={
            landScapeMode
              ? styles.backgroundVideoLandScape
              : styles.backgroundVideo
          }>
          <Video
            ref={refVideo}
            repeat={true}
            resizeMode={'cover'}
            source={{
              uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            }} // Can be a URL or a local file.
            style={
              landScapeMode
                ? styles.backgroundVideoLandScape
                : styles.backgroundVideo
            }
            onLoad={(e: OnLoadData) => {
              onInitMaxDuration(e.duration);
            }}
            onProgress={(e: OnProgressData) => {
              onChangeDuration(e.currentTime);
            }}
            paused={!isPlay}
          />
          <Animated.View style={[styles.config, styleConfig]}>
            <Animated.View style={styles.configRow}>
              <TouchableOpacity style={styles.btn} onPress={onPrevDuration}>
                <Text style={styles.textBtn}>Prev</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.textBtn}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={onNextDuration}>
                <Text style={styles.textBtn}>Next</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.configBottom, styleLine]}>
              <Animated.View style={[styles.line, styleLine]}>
                <Animated.View style={[styles.redLine, styleRedLine]} />
                <GestureDetector gesture={onPanGestureEvent}>
                  <Animated.View
                    hitSlop={{left: 30, right: 30, top: 30, bottom: 30}}
                    style={[styles.circleOut, styleCircle]}>
                    <Animated.View style={[styles.circle]} />
                  </Animated.View>
                </GestureDetector>
              </Animated.View>
              <View style={styles.bottomConfigRow}>
                <ReText text={textDuration} style={styles.duration} />
                <TouchableOpacity onPress={onRotate}>
                  <Text style={styles.textBtn}>Xoay</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
