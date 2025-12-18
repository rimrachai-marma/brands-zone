import BlogComp from "@/components/BlogComp";
import {
  POST_DATA,
  RECENT_COMMENTS,
  RECENT_POSTS,
} from "@/constant/postData";

const page = () => {
  return (
    <>
      <BlogComp
        mainPost={POST_DATA}
        recentPosts={RECENT_POSTS}
        recentComments={RECENT_COMMENTS}
      />
    </>
  );
};

export default page;
