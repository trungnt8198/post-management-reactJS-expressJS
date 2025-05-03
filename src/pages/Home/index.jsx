import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Post from "../../components/Post";
import { getAllPosts } from "../../services/posts";
import style from "./Home.module.scss";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const response = await getAllPosts();
    setPosts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Fetching posts...</div>;
  }

  return (
    <div className={style.container}>
      <h1>Posts Management</h1>
      <Link className={style.create__post__btn} to="/new-post">
        Create new post
      </Link>
      {posts.length > 0 ? (
        <ul className={style.posts}>
          {posts.map((post) => (
            <Post key={post.id} data={post} onDelete={fetchPosts} />
          ))}
        </ul>
      ) : (
        <span>No post found</span>
      )}
    </div>
  );
}
export default Home;
