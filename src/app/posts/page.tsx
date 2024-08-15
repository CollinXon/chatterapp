import Post from "../components/posts";
import ScrollingNews from "../components/sidebar";

const HomePost = () => {
  return (
    <div className="flex gap-36">
      <Post />
      <ScrollingNews />
    </div>
  );
};

export default HomePost;
