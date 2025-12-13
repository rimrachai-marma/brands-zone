export interface Post {
  id: string;
  title: string;
  image: string;
  slug: string;
  content: string;
  author: string;
  authorAvatar?: string;
  category: string;
  commentsCount: number;
  comments?: {
    id: string;
    name: string;
    avatar?: string;
    message: string;
    date: string;
    replies?: {
      id: string;
      name: string;
      message: string;
    }[];
  }[];
}

export interface RecentPost {
  id: number;
  title: string;
  slug: string;
}
