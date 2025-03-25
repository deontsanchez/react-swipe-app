import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  View,
  Platform,
} from 'react-native';
import SwipeCardList from './components/SwipeCardList';
import { getInitialCards, loadMoreCards } from './services/mockDataService';

interface CardItem {
  id: string;
  type: 'image' | 'video' | 'text';
  content: string;
  title?: string;
  description?: string;
}

const App = () => {
  const [initialData, setInitialData] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    const data = getInitialCards();
    setInitialData(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SwipeCardList initialData={initialData} loadMoreData={loadMoreCards} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
