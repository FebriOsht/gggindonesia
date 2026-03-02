export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  origin: string;
  grades: string;
  processing: string;
  paymentTerms: string;
  image: string;
  tastingNotes?: string[];
  bodyAcidity?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorEmail: string;
  date: string;
  image: string;
  category: string;
  readTime: number;
  published: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}