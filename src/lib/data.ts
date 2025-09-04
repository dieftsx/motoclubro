import type { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'cross-country-adventure-the-great-ride',
    title: 'Cross-Country Adventure: The Great Ride',
    description: 'Join us as we recount our epic journey across the country, tackling diverse terrains and creating unforgettable memories.',
    content: `Our journey began on a crisp autumn morning. The excitement was palpable as a dozen riders from MotoBlog Central fired up their engines... We rode through sun-drenched highways, winding mountain passes, and rain-soaked backroads. Each day brought new challenges and breathtaking vistas.

One of the highlights was navigating the legendary Tail of the Dragon, with its 318 curves in just 11 miles. The roar of our engines echoed through the dense forest as we leaned into each turn, a symphony of steel and spirit.

The camaraderie was the true soul of the trip. Evenings were spent around campfires, sharing stories, tuning bikes, and planning the next day's route. This wasn't just a ride; it was a pilgrimage that strengthened our bonds and our love for the open road.`,
    author: {
      name: 'John "Rider" Doe',
      avatarUrl: 'https://picsum.photos/100/100?random=1',
    },
    date: '2024-10-15',
    imageUrl: 'https://picsum.photos/1200/800?random=1',
    category: 'Touring',
    tags: ['Cross-Country', 'Adventure', 'Road Trip'],
  },
  {
    id: 2,
    slug: 'annual-charity-rally-2024-recap',
    title: 'Annual Charity Rally 2024: A Roaring Success',
    description: 'A look back at our most successful charity event yet. We rode for a cause and made a difference in our community.',
    content: `This year's charity rally was nothing short of spectacular. Over 200 bikes from various clubs joined us for a day of riding, music, and fundraising. The event raised over $20,000 for local children's hospitals.

The day kicked off with a scenic group ride through the countryside, a parade of chrome and color that turned heads in every town we passed. Back at the clubhouse, we had live bands, food trucks, and a bike show that showcased some incredible custom machines.

We are immensely proud of what we accomplished together. A huge thank you to all participants, volunteers, and sponsors who made this day possible. Planning for 2025 has already begun!`,
    author: {
      name: 'Jane "V-Twin" Smith',
      avatarUrl: 'https://picsum.photos/100/100?random=2',
    },
    date: '2024-09-20',
    imageUrl: 'https://picsum.photos/1200/800?random=2',
    category: 'Events',
    tags: ['Charity', 'Community', 'Rally'],
  },
  {
    id: 3,
    slug: 'new-gear-guide-staying-safe-and-stylish',
    title: 'New Gear Guide: Staying Safe and Stylish',
    description: 'We review the latest in motorcycle gear, from high-tech helmets to protective yet fashionable jackets.',
    content: `Safety should never be compromised, but that doesn't mean you have to sacrifice style. In this post, we dive into the latest and greatest motorcycle gear of 2024.

First up, smart helmets with integrated HUDs and communication systems. We tested the new Forcite MK1S and were blown away by its features. Next, we looked at the rise of motorcycle airbags, reviewing vests and jackets that offer unparalleled protection in a crash.

We also covered the latest trends in riding apparel, where classic leather meets modern materials like Kevlar and Cordura for the perfect blend of style and safety. Check out our top picks for boots, gloves, and jackets to keep you looking good and feeling secure on your rides.`,
    author: {
      name: 'Mike "Gadget" Johnson',
      avatarUrl: 'https://picsum.photos/100/100?random=3',
    },
    date: '2024-08-05',
    imageUrl: 'https://picsum.photos/1200/800?random=3',
    category: 'News',
    tags: ['Gear', 'Safety', 'Review'],
  },
  {
    id: 4,
    slug: 'the-art-of-motorcycle-maintenance',
    title: 'The Art of Motorcycle Maintenance',
    description: 'A beginner-friendly guide to keeping your bike in top condition. Learn the basics of chain cleaning, oil changes, and more.',
    content: `A well-maintained bike is a happy bike. For many, motorcycle maintenance can seem daunting, but the basics are easier than you think. Regular checks not only ensure your bike's longevity but also your safety on the road.

In this guide, we walk you through the essentials:
- **T-CLOCS Inspection:** A pre-ride checklist covering Tires, Controls, Lights, Oil, Chassis, and Stands.
- **Chain Maintenance:** How to properly clean, lubricate, and adjust your chain for smooth power delivery.
- **Oil Change:** A step-by-step guide to changing your oil and filter, the lifeblood of your engine.

Getting your hands dirty can be a rewarding part of the motorcycle ownership experience. Start with these simple tasks and build your confidence from there.`,
    author: {
      name: 'John "Rider" Doe',
      avatarUrl: 'https://picsum.photos/100/100?random=1',
    },
    date: '2024-07-12',
    imageUrl: 'https://picsum.photos/1200/800?random=4',
    category: 'Maintenance',
    tags: ['DIY', 'Tech Tip', 'Beginner'],
  }
];

export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
}

export const getCategories = () => {
    const categories = blogPosts.map(post => post.category);
    return ['All', ...new Set(categories)];
}

export const getTags = () => {
    const tags = blogPosts.flatMap(post => post.tags);
    return [...new Set(tags)];
}
