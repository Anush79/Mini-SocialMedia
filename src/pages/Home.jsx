import { useEffect, useState } from "react";
import PostBox from "../components/PostBox";
import { usePosts } from "../context/postContext";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import NewForm from "../components/NewPostForm";
import style from "../constants/styleModal";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Edit } from "@mui/icons-material";

export default function Home() {
  const { posts, status } = usePosts();
  const [postsToDisplay, setPostsToDisplay] = useState([...posts?.userPosts, ...posts?.allPosts])
  const [filter, setFilter] = useState('')
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function filterPosts(e) {
    setFilter(e.target.value)
  }
  useEffect(()=>{
   
    switch (filter) {
     
      case "FAVORITES":
        setPostsToDisplay(posts?.favoritePosts);
        break;
      case "LIKED":
        setPostsToDisplay(posts?.likedPosts)
        break;
      default:
        setPostsToDisplay([...posts?.userPosts, ...posts?.allPosts])
    }
  },[filter, posts])
  useEffect(() => {
  
    setPostsToDisplay([...posts?.userPosts, ...posts?.allPosts])
  }, [posts.allPosts, posts.userPosts])
  return (
    <div className="page">
      <div className="utility">
         <button className="flex" onClick={handleOpen}><Edit/> {' '}  New Post</button>

      <select name="filter" onChange={filterPosts} id="">
        <option value="ALL">All</option>
        <option value="LIKED">Liked</option>
        <option value="FAVORITES">Favorites</option>
      </select>

      </div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewForm closeFunc={handleClose} />
        </Box>
      </Modal>


      {status.loading && <div className="loader"></div>}
      <div className="allPost-container flex">
        {postsToDisplay.length ? postsToDisplay?.map((item) => (
          <PostBox key={item.id} post={item} />
        )) :
          <div>
            <div className="error">
               <ReportGmailerrorredIcon/>
            </div>
           
            <br/>
            No Posts to display</div>
        }
      </div>
    </div>
  );
}
