import React, { useState, useRef, useCallback } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  ViewToken,
  ListRenderItemInfo,
} from 'react-native';
import SwipeCard from './SwipeCard';
import { Animated } from 'react-native';

const { height } = Dimensions.get('window');

interface CardItem {
  id: string;
  type: 'image' | 'video' | 'text';
  content: string;
  title?: string;
  description?: string;
}

interface SwipeCardListProps {
  initialData: CardItem[];
  loadMoreData: () => Promise<CardItem[]>;
}

interface ViewableItemsChanged {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
}

const SwipeCardList = ({ initialData, loadMoreData }: SwipeCardListProps) => {
  const [data, setData] = useState<CardItem[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<CardItem>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleLoadMore = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const newItems = await loadMoreData();
      setData(prevData => [...prevData, ...newItems]);
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, loadMoreData]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.floor(offsetY / height);

      if (index !== currentIndex) {
        setCurrentIndex(index);
      }

      // Preload more content when nearing the end
      if (index >= data.length - 3 && !loading) {
        handleLoadMore();
      }
    },
    [currentIndex, data.length, handleLoadMore, loading]
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<CardItem>) => {
      return <SwipeCard item={item} isVisible={index === currentIndex} />;
    },
    [currentIndex]
  );

  const getItemLayout = (_: any, index: number) => ({
    length: height,
    offset: height * index,
    index,
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: ViewableItemsChanged) => {
      if (
        viewableItems.length > 0 &&
        typeof viewableItems[0].index === 'number'
      ) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: CardItem) => item.id}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={handleViewableItemsChanged}
        getItemLayout={getItemLayout}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        initialNumToRender={2}
        windowSize={5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#fff" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default SwipeCardList;
