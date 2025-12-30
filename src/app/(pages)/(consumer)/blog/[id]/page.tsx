import SingleBlog from "@/components/SingleBlog";
import { POST_DATA } from "@/constant/postData";
import { Post } from "@/types";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const blogPromise = new Promise<Post | undefined>((resolve) => {
    const blog = POST_DATA.find((b) => String(b.slug) === id);
    setTimeout(() => resolve(blog), 100); 
    
  });
  const [blog] = await Promise.all([blogPromise]);

  if (!blog) {
    return (
      <div className="p-10 text-center text-red-500 text-lg font-semibold">
        Blog not found.
      </div>
    );
  }

  return (
    <>
      <SingleBlog blog={blog} />
    </>
  );
}
