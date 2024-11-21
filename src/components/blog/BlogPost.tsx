import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import BlogPostMeta from './BlogPostMeta';
import LazyImage from '../LazyImage';

const BlogContent = lazy(() => import('./BlogContent'));
const BlogActions = lazy(() => import('./BlogActions'));

interface BlogPostProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    content: string;
    isFeatured?: boolean;
  };
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-royal-scroll/80 rounded-lg shadow-lg overflow-hidden border border-royal-accent/20"
    >
      <div className="p-8 space-y-6">
        <div className="flex items-center gap-2 text-sm">
          {post.isFeatured && (
            <span className="px-3 py-1 bg-royal-primary/10 text-royal-primary rounded-full flex items-center gap-1">
              <Star className="w-4 h-4" />
              Featured Article
            </span>
          )}
          <span className="px-3 py-1 bg-royal-primary/10 text-royal-primary rounded-full">
            {post.category}
          </span>
        </div>

        <h2 className="text-3xl font-bold text-royal-primary hover:text-royal-secondary transition-colors">
          {post.title}
        </h2>

        <BlogPostMeta
          author={post.author}
          date={post.date}
          readTime={post.readTime}
          category={post.category}
        />

        <Suspense fallback={<div className="animate-pulse h-40 bg-gray-200 rounded" />}>
          <BlogContent content={post.content} />
        </Suspense>
        
        <Suspense fallback={null}>
          <BlogActions
            title={post.title}
            excerpt={post.excerpt}
          />
        </Suspense>
      </div>
    </motion.article>
  );
}