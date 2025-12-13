import { Post, RecentPost } from "@/types";
import BlogPostCard from "./BlogPostCard";
import BlogSidebar from "./BlogSidebar";

// Define the shape of the data required by the page
interface BlogLayoutProps {
  mainPost: Post[];
  recentComments: string[];
  recentPosts: RecentPost[];
}

const BlogComp = ({
  mainPost,
  recentPosts,
  recentComments,
}: BlogLayoutProps) => {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {mainPost.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <BlogSidebar
              recentPosts={recentPosts}
              recentComments={recentComments}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogComp;
