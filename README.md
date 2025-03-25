# React Native Swipe Card UI

A minimalist swipe card UI with vertical scrolling similar to TikTok, built using React Native and Expo.

## Features

- Full-screen card-based interface with vertical swipe navigation
- Smooth transitions and physics-based animations
- Support for images, videos, and text content
- Infinite scroll with efficient content loading
- Hardware-accelerated animations for optimal performance

## Technical Implementation

- Uses React Native's FlatList with optimizations for memory efficiency
- Implements gesture recognition for swipe detection
- Preloads content ahead of current position
- Recycles DOM elements for better performance
- Supports both touch and mouse interactions
- Implements progressive loading for seamless infinite scrolling

## Running the Project

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## Project Structure

- `/components` - UI components including SwipeCard and SwipeCardList
- `/services` - Data services for fetching and managing content

## Dependencies

- React Native (with Expo)
- expo-av (for video playback)

## Performance Considerations

- Maintains 60fps during animations using hardware acceleration
- Implements content prefetching for seamless scrolling
- Uses lazy loading for media assets
- Optimizes rendering with virtual lists
