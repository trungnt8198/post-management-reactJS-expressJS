import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPost } from "../../services/posts";
import style from "./CreatePost.module.scss";

function CreatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    createdDate: new Date().toLocaleDateString("vi-VN"),
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    toast
      .promise(
        createPost(formData),
        {
          pending: "Creating post...",
          success: "Created post successfully!",
          error: {
            render: ({ data: response }) => {
              return response.message;
            },
          },
        },
        {
          toastId: "create-post-toast",
        }
      )
      .finally(() => {
        setLoading(false);
        setFormData({
          title: "",
          author: "",
          description: "",
          createdDate: new Date().toLocaleDateString("vi-VN"),
        });
        navigate("/");
      });
  };

  return (
    <div className={style.container}>
      <h1>Create Post</h1>
      <form className={style.form__create__post} onSubmit={handleSubmit}>
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
            value="Create new post"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
