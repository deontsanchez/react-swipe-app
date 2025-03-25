import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

const { width, height } = Dimensions.get('window');

interface SwipeCardProps {
  item: {
    id: string;
    type: 'image' | 'video' | 'text';
    content: string;
    title?: string;
    description?: string;
  };
  style?: ViewStyle;
  isVisible: boolean;
}

const SwipeCard = ({ item, style, isVisible }: SwipeCardProps) => {
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    // Auto-play or pause video based on visibility
    if (videoRef.current) {
      if (isVisible && item.type === 'video') {
        videoRef.current.playAsync();
      } else if (!isVisible && item.type === 'video') {
        videoRef.current.pauseAsync();
      }
    }
  }, [isVisible, item.type]);

  return (
    <View style={[styles.card, style]}>
      {item.type === 'image' && (
        <Image
          source={{ uri: item.content }}
          style={styles.media}
          resizeMode="cover"
        />
      )}

      {item.type === 'video' && (
        <Video
          ref={videoRef}
          source={{ uri: item.content }}
          style={styles.media}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay={isVisible}
          useNativeControls={false}
        />
      )}

      {item.type === 'text' && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.content}</Text>
        </View>
      )}

      {(item.title || item.description) && (
        <View style={styles.overlay}>
          {item.title && <Text style={styles.title}>{item.title}</Text>}
          {item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width,
    height: height,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#fff',
    fontSize: 14,
  },
});

export default SwipeCard;
