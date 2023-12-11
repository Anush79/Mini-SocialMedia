import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";
import actionTypes from "../constants/action";
import { useEffect, useState } from "react";
import { usePosts } from "../context/postContext";
import { NavLink } from "react-router-dom";
import { ThumbUp, ThumbUpAltOutlined } from "@mui/icons-material";
const { LIKE, DISLIKE, ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } = actionTypes;

export default function PostBox({ post }) {
  const { dispatch, posts } = usePosts();

  const [liked, setLiked] = useState(
    posts.likedPosts.find((item) => item.id === post.id)
  );
  const [favorite, setfavorite] = useState(
    posts.favoritePosts.find((item) => item.id === post.id)
  );

  function likeFunction(post) {
    setLiked((prev) => !prev);
    if (!liked) dispatch({ type: LIKE, payload: post });
    else dispatch({ type: DISLIKE, payload: post.id });
  }
  function favoriteFunction() {
    setfavorite(!favorite);
    if (!favorite) {
      dispatch({ type: ADD_TO_FAVORITE, payload: post });
      toast.info("Post Added to favorite");
    } else dispatch({ type: REMOVE_FROM_FAVORITE, payload: post.id });
  }
  useEffect(() => {}, [posts]);
  return (
    <div className="post-container" key={post.title}>
      {" "}
      <div>
        <NavLink to={`/${post.id}`}>
          <div className="flex">
            <img
              src={`https://ui-avatars.com/api/?name=${post.title}}?background=random`}
              alt=""
            />
            User {post.userId}
          </div>

          <p>
            <b>{post?.title} </b>
          </p>
          <p>
            <hr />
            {post?.body}
          </p>
        </NavLink>
      </div>
      <div>
        <button
          title="Like"
          onClick={() => {
            likeFunction(post);
          }}
        >
          {liked ? (
            <ThumbUp style={{ color: "#00FFFF" }} />
          ) : (
            <ThumbUpAltOutlined />
          )}
        </button>

        <button title="Add to favorite" onClick={favoriteFunction}>
          {favorite ? (
            <StarIcon style={{ color: "#FFFF00" }} />
          ) : (
            <StarOutlineIcon />
          )}
        </button>
      </div>
    </div>
  );
}
