import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { removePost } from "../../services/posts";
import style from "./Post.module.scss";

function Post({ data, onDelete }) {
  const [loading, setLoading] = useState(false);
  const handleRemovePost = (id) => {
    const deleteConfirmed = confirm("Are you sure want to remove this post ?");
    if (!deleteConfirmed) {
      return;
    }
    setLoading(true);
    toast
      .promise(removePost(id), {
        pending: "Removing post...",
        success: "Removed post successfully",
        error: "Error, can not remove post",
      })
      .then(() => {
        if (typeof onDelete === "function") onDelete?.();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <li className={style.post}>
      <div className={style.post__info}>
        <h2>
          <span>{data.title}</span>
          <span>{data.createdDate}</span>
        </h2>
        <h3>{data.author}</h3>
        <p>{data.description}</p>
      </div>
      <div className={style.group__btn}>
        <Link className={style.btn} to={`/edit-post/${data.id}`}>
          Update
        </Link>
        <button
          className={style.btn}
          onClick={() => handleRemovePost(data.id)}
          disabled={loading}
        >
          {loading ? "Removing..." : "Remove"}
        </button>
      </div>
      <hr />
    </li>
  );
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Post;
