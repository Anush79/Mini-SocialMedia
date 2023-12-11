import { useEffect, useState } from "react";
import PostBox from "../components/PostBox";
import { usePosts } from "../context/postContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NewForm from "../components/NewPostForm";
import style from "../constants/styleModal";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Edit } from "@mui/icons-material";

export default function Home() {
  const { posts, status } = usePosts();
  const [postsToDisplay, setPostsToDisplay] = useState([
    ...posts?.userPosts,
    ...posts?.allPosts,
  ]);
  const [filter, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function filterPosts(e) {
    setFilter(e.target.value);
  }
  useEffect(() => {
    switch (filter) {
      case "SEARCH":
       
        break;
      case "FAVORITES":
        setPostsToDisplay(posts?.favoritePosts);
        break;
      case "LIKED":
        setPostsToDisplay(posts?.likedPosts);
        break;
      default:
        setPostsToDisplay([...posts?.userPosts, ...posts?.allPosts]);
    }
  }, [filter, posts]);

  const filteredPosts = searchInput.length >0 ? postsToDisplay?.filter(
      (item) =>
        item.userId === Number(searchInput) ||
        item.title.toLowerCase().includes(searchInput) ||
        item.body.toLowerCase().includes(searchInput)
    ) : postsToDisplay
  
  useEffect(() => {
    setPostsToDisplay([...posts?.userPosts, ...posts?.allPosts]);
    setFilter('ALL')
  }, [posts.allPosts, posts.userPosts]);
  return (
    <div className="page">
      <div className="utility">
        <button className="flex" onClick={handleOpen}>
          <Edit /> New{" "}
        </button>
       <div className="flex">

       <input
          type="text "
          placeholder="Search for title, body or userId "
          aria-label="search for something"
          onChange={(e) => {
            setSearchInput(e.target.value.toLowerCase());
          }}
        />
        <select name="filter" onChange={filterPosts} value={filter} id="">

          <option value="ALL">All</option>
          <option value="LIKED">Liked</option>
          <option value="FAVORITES">Favorites</option>
        </select>
       </div>
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
        {filteredPosts.length ? (
          filteredPosts?.map((item) => <PostBox key={item.id} post={item} />)
        ) : (
          <div>
            <div className="error">
              <ReportGmailerrorredIcon />
            </div>
            <br />
            No Posts to display
          </div>
        )}
      </div>
    </div>
  );
}
