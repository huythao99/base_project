import {useEffect, useRef, useState} from 'react';
import {BackHandler} from 'react-native';
import Video from 'react-native-video';

const URLS = [
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
];

export default function useHome() {
  const refVideo = useRef<Video | null>(null);
  const refVideoSecond = useRef<Video | null>(null);
  const maxDuration = useRef(0);

  const [isPlay, setIsPlay] = useState(true);
  const [isPlaySecondVideo, setIsPlaySecondVideo] = useState(false);
  const [uriVideoOne, setUriVideoOne] = useState(URLS[0]);
  const [uriVideoTwo, setUriVideoTwo] = useState(URLS[1]);
  const [keyOne, setKeyOne] = useState(0);
  const [keyTwo, setKeyTwo] = useState(-10);

  const onInitMaxDuration = (duration: number) => {
    console.log('on load video one');

    refVideo?.current?.seek(Math.min(maxDuration.current, duration - 10));
    maxDuration.current = duration;
  };

  const onInitMaxDurationSecond = (duration: number) => {
    console.log('on load video two');

    refVideoSecond?.current?.seek(Math.min(maxDuration.current, duration - 10));
    maxDuration.current = duration;
  };

  const onChangeDuration = (duration: number) => {
    console.log(Math.floor(maxDuration.current - duration));
    if (Math.floor(maxDuration.current - duration) === 10) {
      setKeyTwo(keyTwo + 1);
    }
  };

  const onChangeDurationSecond = (duration: number) => {
    console.log('max', Math.floor(maxDuration.current) - Math.floor(duration));
    console.log(Math.floor(duration));
    if (Math.floor(maxDuration.current) - Math.floor(duration) === 100) {
      setKeyOne(keyOne + 1);
    }
  };

  const onEndVideoOne = () => {
    console.log('end video one');
    setIsPlay(false);
    setIsPlaySecondVideo(true);
  };

  const onEndVideoTwo = () => {
    console.log('end video two');

    setIsPlay(true);
    setIsPlaySecondVideo(false);
  };

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return {
    refVideo,
    isPlay,
    uriVideoOne,
    uriVideoTwo,
    refVideoSecond,
    isPlaySecondVideo,
    keyOne,
    keyTwo,
    onChangeDurationSecond,
    onChangeDuration,
    onInitMaxDuration,
    onEndVideoOne,
    onEndVideoTwo,
    onInitMaxDurationSecond,
  };
}
