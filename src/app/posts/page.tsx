import Post from "../components/posts";
import ScrollingNews from "../components/sidebar";

const HomePost = () => {
  return (
    <div className="flex p-6">
      <Post />

      <div className="hidden sm:block">
      <ScrollingNews />
      </div>
    </div>
  );
};

export default HomePost;
