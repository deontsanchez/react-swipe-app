interface CardItem {
  id: string;
  type: 'image' | 'video' | 'text';
  content: string;
  title?: string;
  description?: string;
}

// Sample image URLs from Unsplash (using portrait and higher quality images)
const sampleImages = [
  'https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?q=80&w=1964&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516914589923-f105f0bc5fde?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604537466608-109fa2f16c3b?q=80&w=1969&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=1949&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?q=80&w=1974&auto=format&fit=crop',
];

// Sample video URLs from reliable sources
const sampleVideos = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
];

// Better formatted text content
const sampleTexts = [
  "Life isn't about finding yourself.\nIt's about creating yourself.",
  'The best way to predict the future\nis to create it.',
  'Every moment is a fresh beginning.\nEmbrace it.',
  'Do what you love,\nlove what you do.',
  'Dream big.\nWork hard.\nStay focused.',
  'The journey of a thousand miles\nbegins with a single step.',
  'Be the change\nyou wish to see\nin the world.',
  'Live life to the fullest,\nand focus on the positive.',
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
      title: Math.random() > 0.3 ? 'Beautiful World' : undefined,
      description:
        Math.random() > 0.5
          ? 'Capture the moment and cherish the memories'
          : undefined,
    };
  } else if (random < 0.8) {
    // Video content
    const randomVideoIndex = Math.floor(Math.random() * sampleVideos.length);
    return {
      id: String(nextId++),
      type: 'video',
      content: sampleVideos[randomVideoIndex],
      title: Math.random() > 0.3 ? 'Watch This' : undefined,
      description:
        Math.random() > 0.5
          ? 'Some moments are better experienced in motion'
          : undefined,
    };
  } else {
    // Text content
    const randomTextIndex = Math.floor(Math.random() * sampleTexts.length);
    return {
      id: String(nextId++),
      type: 'text',
      content: sampleTexts[randomTextIndex],
      title: Math.random() > 0.3 ? 'Inspiration' : undefined,
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
