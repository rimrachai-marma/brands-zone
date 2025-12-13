import { Post } from "@/types";
import SingleBLogPost from "./SingleBLogPost";

const SingleBlog = ({ blog }: { blog: Post }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <SingleBLogPost blog={blog} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBlog;
