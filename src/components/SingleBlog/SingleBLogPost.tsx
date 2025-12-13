"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Folder, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/types";

const commentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(5, "Message should be at least 5 characters"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

const SingleBlogPost = ({ blog }: { blog: Post }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (values: CommentFormValues) => {
    console.log("Comment submitted:", values);
    reset();
  };

  return (
    <motion.section
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Blog Header */}
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-120  overflow-hidden"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="mt-6 space-y-2">
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Image
                src={blog.authorAvatar || "/placeholder-avatar.png"}
                alt={blog.author}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Folder className="w-4 h-4 text-primary" />
              <span>{blog.category}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>{blog.commentsCount} Comments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <motion.article
        className="prose max-w-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <Separator className="my-10" />

      {/* Comment Section */}
      <motion.div
      className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Leave a Comment</h2>

        <Card className="border border-primary/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Your Thoughts</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    {...register("name")}
                    className=" focus-visible:border-primary/20"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Your Email"
                    {...register("email")}
                    className=" focus-visible:border-primary/20"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Textarea className="focus-visible:border-primary/20 focus-visible:ring-0 focus:ring-0"
                  placeholder="Write your comment..."
                  rows={5}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-2"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-10 space-y-6">
          {blog.comments?.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-200 p-4 "
            >
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={comment.avatar || "/placeholder-avatar.png"}
                  alt={comment.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{comment.name}</p>
                  <span className="text-xs text-gray-500">
                    {comment.date}
                  </span>
                </div>
              </div>
              <p className="text-gray-700">{comment.message}</p>

              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 pl-8 border-l border-gray-200 space-y-3">
                  {comment.replies.map((reply) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 p-3 "
                    >
                      <p className="font-semibold text-sm">
                        {reply.name}
                      </p>
                      <p className="text-sm text-gray-700">
                        {reply.message}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SingleBlogPost;
