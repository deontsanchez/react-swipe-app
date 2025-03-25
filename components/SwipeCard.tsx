import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

const { width, height } = Dimensions.get('window');

const screenHeight = height;

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
  const videoPlayer = useVideoPlayer(
    item.type === 'video' ? item.content : '',
    player => {
      player.loop = true;
      if (isVisible) {
        player.play();
      } else {
        player.pause();
      }
    }
  );

  useEffect(() => {
    if (item.type === 'video') {
      if (isVisible) {
        videoPlayer.play();
      } else {
        videoPlayer.pause();
      }
    }
  }, [isVisible, item.type, videoPlayer]);

  return (
    <View style={[styles.card, style]}>
      {item.type === 'image' && (
        <View style={styles.mediaContainer}>
          <Image
            source={{ uri: item.content }}
            style={styles.media}
            resizeMode="cover"
          />
        </View>
      )}

      {item.type === 'video' && (
        <View style={styles.mediaContainer}>
          <VideoView
            player={videoPlayer}
            style={styles.media}
            allowsFullscreen={false}
          />
        </View>
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
    height: screenHeight,
    backgroundColor: '#000',
    overflow: 'hidden',
    position: 'relative',
  },
  mediaContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  media: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SwipeCard;
