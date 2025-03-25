interface CardItem {
  id: string;
  type: 'image' | 'video' | 'text';
  content: string;
  title?: string;
  description?: string;
}

// Sample image URLs from Unsplash (using portrait and higher quality images)
const sampleImages: string[] = [
  'https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?q=80&w=1964&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604537466608-109fa2f16c3b?q=80&w=1969&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=1949&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?q=80&w=1974&auto=format&fit=crop',
];

let nextId = 1;

const generateRandomCard = (): CardItem => {
  // Randomly choose content type with weights: 60% image, 20% video, 20% text

  // Image content
  const randomImageIndex = Math.floor(Math.random() * sampleImages.length);
  return {
    id: String(nextId++),
    type: 'image',
    content: sampleImages[randomImageIndex],
    title: 'Beautiful World',
    description: 'Capture the moment and cherish the memories',
  };
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
