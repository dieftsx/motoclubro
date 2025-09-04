export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  imageUrl: string;
  category: string;
  tags: string[];
};
