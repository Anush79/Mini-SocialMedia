import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/postContext";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NewForm from "../components/NewPostForm";
import { ArrowBack, DeleteForeverOutlined, Edit, Error } from "@mui/icons-material";
import actionTypes from "../constants/action";

const { DELETE_POST } = actionTypes;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const {
    status: { loading },
    setStatus,
    dispatch,
    posts,
    user,
    deletePost
  } = usePosts();

  const [postData, setPostData] = useState({
    post: {},
    comments: [],
  });
  const userPost = posts?.userPosts?.find((item) => item.id === Number(postId)); 

  const [open, setOpen] = useState(false);
  const handleOpen = () =>{ setOpen(true);
    setPostData((prev) => ({ ...prev, post:  posts?.allPosts?.find((item) => item.id === Number(postId)) ?? posts?.userPosts?.find((item) => item.id === Number(postId))}));
  };
  const handleClose = () => setOpen(false);

  const getPostDetails = async () => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const data = await res.json();
      setPostData((prev) => ({ ...prev, post: data }));
    } catch (error) {
      console.error(error);
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };
  const getComments = async () => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const data = await res.json();
      setPostData((prev) => ({ ...prev, comments: data }));
    } catch (error) {
      console.error(error);
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleDelete = (id) => {
    if(userPost)
    dispatch({ type: DELETE_POST, payload: id });
  else deletePost(id)
    navigate(-1);
  };

  useEffect(() => {
    if (userPost) setPostData((prev) => ({ ...prev, post: userPost }));
    else getPostDetails();
    getComments();
  }, [userPost]);
  return (
    <div className="page">
      {loading && <div className="loader"></div>}
      <div className="header">
        <button onClick={() => navigate(-1)}>
          <ArrowBack />
        </button>
        <h2> {postData?.post?.title}</h2>
      </div>

      {
        !postData.post.id &&  <h2 className="error"><Error/> <p>No Data Found </p> </h2>
      }
   
      <p>{postData?.post?.body}</p>
      <div className="flex">
      {(userPost || postData.post.userId === Number(user)) && (
        <button className="flex" onClick={handleOpen}>
          <Edit /> Edit 
        </button>
      )}
      {(userPost || postData.post.userId === Number(user)) && (
        <button className="flex"
          onClick={() => {
            handleDelete(postData?.post?.id);
          }}
        >
          <DeleteForeverOutlined /> 
          Delete 
        </button>
      )}
      </div>
  {postData.comments.length>0 &&    <h3>Comments</h3>}
      <p className="comments-container flex">
        {postData?.comments?.map((item) => (
          <div className="comments flex">
     <small>{item.email}</small>       
<p>
            <b>{item.name}</b>
            </p>
            {item.body}
          
          </div>
        ))}
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewForm closeFunc={handleClose} toEditData={postData.post} />
        </Box>
      </Modal>
    </div>
  );
}
