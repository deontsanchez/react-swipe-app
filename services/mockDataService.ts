interface CardItem {
  id: string;
  type: 'image' | 'video' | 'text';
  content: string;
  title?: string;
  description?: string;
}

// Sample image URLs from Unsplash
const sampleImages = [
  'https://images.unsplash.com/photo-1588499756884-d72584d84df5?q=80&w=2787&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579762593175-20226054cad0?q=80&w=2942&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2864&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2787&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2874&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570166146566-8512efb94688?q=80&w=2840&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1484621781395-c2ec0a3d1e74?q=80&w=2832&auto=format&fit=crop',
];

// Sample video URLs from reliable sources
const sampleVideos = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
];

const sampleTexts = [
  'Explore the wonders of nature',
  'Discover new perspectives',
  'Journey through imagination',
  'Embrace the unexpected',
  'Find beauty in simplicity',
  'Create your own story',
  'Connect with the world around you',
  'Moments that matter',
];

let nextId = 1;

const generateRandomCard = (): CardItem => {
  // Randomly choose content type with weights: 60% image, 20% video, 20% text
  const random = Math.random();

  if (random < 0.6) {
    // Image content
    const randomImageIndex = Math.floor(Math.random() * sampleImages.length);
    return {
      id: String(nextId++),
      type: 'image',
      content: sampleImages[randomImageIndex],
      title: Math.random() > 0.3 ? `Image ${nextId}` : undefined,
      description:
        Math.random() > 0.5
          ? `This is a beautiful image #${nextId}`
          : undefined,
    };
  } else if (random < 0.8) {
    // Video content
    const randomVideoIndex = Math.floor(Math.random() * sampleVideos.length);
    return {
      id: String(nextId++),
      type: 'video',
      content: sampleVideos[randomVideoIndex],
      title: Math.random() > 0.3 ? `Video ${nextId}` : undefined,
      description:
        Math.random() > 0.5
          ? `Check out this amazing video #${nextId}`
          : undefined,
    };
  } else {
    // Text content
    const randomTextIndex = Math.floor(Math.random() * sampleTexts.length);
    return {
      id: String(nextId++),
      type: 'text',
      content: sampleTexts[randomTextIndex],
      title: Math.random() > 0.3 ? `Thought ${nextId}` : undefined,
    };
  }
};

export const getInitialCards = (): CardItem[] => {
  const items: CardItem[] = [];
  for (let i = 0; i < 5; i++) {
    items.push(generateRandomCard());
  }
  return items;
};

export const loadMoreCards = async (): Promise<CardItem[]> => {
  // Simulate network delay
  return new Promise(resolve => {
    setTimeout(() => {
      const newItems: CardItem[] = [];
      for (let i = 0; i < 3; i++) {
        newItems.push(generateRandomCard());
      }
      resolve(newItems);
    }, 1500);
  });
};
