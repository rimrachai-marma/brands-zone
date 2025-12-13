import { RecentPost } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "lucide-react";
import { ReactNode } from "react";

interface BlogSidebarProps {
  recentPosts: RecentPost[];
  recentComments: string[]; 
}

const SidebarSection: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <div className="mb-8 p-6 bg-white shadow-sm border">
    <h3 className="text-lg font-bold border-l-4 border-primary pl-3 mb-4 ">
      {title}
    </h3>
    {children}
  </div>
);

const BlogSidebar = ({ recentPosts, recentComments }: BlogSidebarProps) => {
  return (
    <div className="space-y-8 sticky top-8">
      {/* 1. Search Bar Section */}
      <SidebarSection title="Search">
        <div className="flex items-center">
          <Input 
            type="text" 
            placeholder="Search..." 
            className="grow"
          />
          <Button className="bg-primary p-3 h-auto">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </SidebarSection>

      {/* 2. Recent Posts Section */}
      <SidebarSection title="Recent Posts">
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className=" hover:text-primary transition-colors duration-200 block text-sm leading-relaxed"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </SidebarSection>

      {/* 3. Recent Comments Section */}
      <SidebarSection title="Recent Comments">
        <ul className="space-y-4">
          {recentComments.map((comment, index) => (
            <li key={index}>
                <p className=" text-sm italic border-b border-dashed pb-2 last:border-b-0">
                    &quot;{comment}&quot;
                </p>
            </li>
          ))}
        </ul>
      </SidebarSection>
    </div>
  );
};

export default BlogSidebar;