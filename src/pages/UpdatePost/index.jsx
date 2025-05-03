import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPostById, updatePost } from "../../services/posts";
import style from "./UpdatePost.module.scss";
function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setLoading(true);
    toast
      .promise(
        getPostById(id),
        {
          pending: "Fetching post...",
          success: "Fetched post successfully!",
          error: {
            render: ({ data }) => {
              return data.message;
            },
          },
        },
        {
          toastId: "update-post-toast",
        }
      )
      .then(({ data }) => {
        setFormData({
          title: data.title,
          author: data.author,
          description: data.description,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    console.log(id, formData);

    e.preventDefault();
    setLoading(true);
    toast
      .promise(
        updatePost(id, formData),
        {
          pending: "Updating post...",
          success: "Updated post successfully!",
          error: {
            render: ({ data }) => {
              return data.message;
            },
          },
        },
        {
          toastId: "update-post-toast",
        }
      )
      .finally(() => {
        setLoading(false);
        navigate("/");
      });
  };

  return (
    <div className={style.container}>
      <h1>Update Post</h1>
      <form className={style.form__update__post} onSubmit={handleSubmit}>
        <label>
          <span>Title: </span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          <span>Author: </span>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          <span>Description: </span>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <div className={style.group__btn}>
          <Link to="/" className={style.btn}>
            Back
          </Link>
          <input
            className={style.btn}
            type="submit"
            value="Update post"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}

export default UpdatePost;
