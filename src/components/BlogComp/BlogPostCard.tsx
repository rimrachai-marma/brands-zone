// components/blog/BlogPostCard.tsx
"use client";

import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Folder, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface BlogPostCardProps {
  post: Post;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <motion.article
      className="bg-white shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Featured Image Section */}
      <div className="relative h-120 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          loading="lazy"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-8">
        {/* Meta Info: Author, Category, Comments */}
        <div className="flex items-center gap-6 text-sm  mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative rounded-full overflow-hidden">
              <Image 
                src={post.authorAvatar || "/placeholder-avatar.png"} 
                alt={post.author} 
                fill 
                className="object-cover"
              />
            </div>
            <span className="font-semibold ">{post.author}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Folder className="w-4 h-4 text-primary" />
            <span className="uppercase tracking-wider text-xs">{post.category}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-xs">{post.commentsCount}</span>
          </div>
        </div>
        
        {/* Title and Excerpt */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-3xl font-bold mb-4 transition-colors duration-200 hover:text-primary">
            {post.title}
          </h2>
        </Link>
        <p className=" mb-6 line-clamp-4">
          {post.content.replace(/<[^>]+>/g, "").slice(0, 335)}...
        </p>

        {/* Read More Button */}
        <Link href={`/blog/${post.slug}`}>
          <Button className="hover:bg-secondary text-white font-semibold py-2 px-6  transition-all duration-300">
            Continue Reading
          </Button>
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogPostCard;