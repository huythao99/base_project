import * as React from 'react';
import {View} from 'react-native';
import useHome from './home-hooks';
import styles from './styles';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {WIDTH} from '../../constants/dimensions';

export default function HomeScreen() {
  const {
    refVideo,
    isPlay,
    uriVideoOne,
    uriVideoTwo,
    refVideoSecond,
    keyOne,
    keyTwo,
    isPlaySecondVideo,
    onChangeDurationSecond,
    onChangeDuration,
    onInitMaxDuration,
    onEndVideoOne,
    onEndVideoTwo,
    onInitMaxDurationSecond,
  } = useHome();

  return (
    <View style={styles.container}>
      <View style={styles.backgroundVideo}>
        <Video
          key={`${keyOne}-first`}
          ref={refVideo}
          repeat={false}
          resizeMode={'cover'}
          source={{
            uri: uriVideoOne,
          }} // Can be a URL or a local file.
          style={[
            styles.backgroundVideo,
            {
              transform: [
                {
                  translateX: isPlay ? 0 : -WIDTH,
                },
              ],
            },
          ]}
          onLoad={(e: OnLoadData) => {
            onInitMaxDuration(e.duration);
          }}
          onProgress={(e: OnProgressData) => {
            onChangeDuration(e.currentTime);
          }}
          onEnd={onEndVideoOne}
          paused={!isPlay}
          controls={true}
        />
        <Video
          key={`${keyTwo}-second`}
          ref={refVideoSecond}
          repeat={false}
          resizeMode={'cover'}
          source={{
            uri: uriVideoTwo,
          }} // Can be a URL or a local file.
          style={[
            styles.backgroundVideo,
            {
              transform: [
                {
                  translateX: isPlaySecondVideo ? 0 : -WIDTH,
                },
              ],
            },
          ]}
          onEnd={onEndVideoTwo}
          onLoad={(e: OnLoadData) => {
            onInitMaxDurationSecond(e.duration);
          }}
          onProgress={(e: OnProgressData) => {
            onChangeDurationSecond(e.currentTime);
          }}
          paused={!isPlaySecondVideo}
          controls={true}
        />
      </View>
    </View>
  );
}
