import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";
import actionTypes from "../constants/action";
const PostContext = createContext();
const {
  ADD,
  LIKE,
  DISLIKE,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  NEW_POST,
  DELETE_POST,
  EDIT_POST,
} = actionTypes;
export default function PostProvider({ children }) {
  const initialValue = {
    userPosts: [],
    allPosts: [],
    likedPosts: [],
    favoritePosts: [],
  };
  const [user, setUser] = useState(0); //setting initial user

  const [status, setStatus] = useState({
    loading: false,
    error: null,
  });

  const [posts, dispatch] = useReducer(reducerFunc, initialValue); //global state for posts
  console.log(posts);
  function reducerFunc(state, action) {
    const { type, payload } = action;
    switch (type) {
      case ADD:
        return { ...state, allPosts: payload };
      case LIKE:
        return { ...state, likedPosts: [payload, ...state.likedPosts] };
      case DISLIKE:
        return {
          ...state,
          likedPosts: [
            ...state.likedPosts.filter((item) => item.id !== payload),
          ],
        };
      case ADD_TO_FAVORITE:
        return { ...state, favoritePosts: [payload, ...state.favoritePosts] };
      case REMOVE_FROM_FAVORITE:
        return {
          ...state,
          favoritePosts: [
            ...state.favoritePosts.filter((item) => item.id !== payload),
          ],
        };
      case NEW_POST:
        return { ...state, userPosts: [payload, ...state.userPosts] };

      case EDIT_POST:
        return payload.userPost
          ? {
              ...state,
              userPosts: state.userPosts.map((item) =>
                item.id === payload.id ? payload : item
              ),
            }
          : {
              ...state,
              allPosts: state.allPosts.map((item) =>
                item.id === payload.id ? payload : item
              ),
            };
      case DELETE_POST:
        return state.userPosts.find(item=>item.id === payload)?{
          ...state,
          userPosts: state.userPosts.filter((item) => item.id !== payload),
        } : {
          ...state,
          allPosts: state.allPosts.filter((item) => item.id !== payload),
        }
      default:
        break;
    }
  }
  const allUsers = posts.allPosts?.reduce((acc, curr) => {
    if (acc.includes(curr.userId)) return acc;
    else return [...acc, curr.userId];
  }, []);


  const fetchPostsFromApi = async () => {
    try {
      setStatus({ loading: true, error: null });
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      dispatch({ type: ADD, payload: data });
    } catch (error) {
      setStatus({ loading: false, error });
      console.error(error);
    } finally {
      setStatus({ ...status, loading: false });
    }
  };

  const addNewPost = async (newPost) => {
    try {
      setStatus({ ...status, loading: true });
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );
      const newData = await response.json();
      dispatch({ type: NEW_POST, payload: {userId:user,...newData} });
      console.log(newData);
      toast.success("New Post Added");
    } catch (error) {
      console.error(error);
      toast.error('Failed to create new post')
    } finally {
      setStatus({ ...status, loading: false });
    }
  };
  const editPost = async (editedPostData) => {
    try {
     if( posts?.allPosts?.find((item) => item.id === editedPostData.id)) {
       setStatus({ ...status, loading: true });
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editedPostData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedPostData),
        }
      );
      const newData = await response.json();
      dispatch({ type: EDIT_POST, payload: newData });
      toast.success('Post Edited Successfully but it is not visible here because updated version is not saved in any database, To view the updated post, kindly navigate back to the Home page. ')
     }
     else {
      dispatch({ type: EDIT_POST, payload: editedPostData });
      toast.success('Post Edited Successfully');
     }
    } catch (err) {
      console.error(err);
      toast.error('Failed to Edit the post ')
    } finally {
      setStatus({ ...status, loading: false });
    }
  };
  const deletePost = async (postId) => {
    try {
      setStatus({ ...status, loading: true });
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      dispatch({ type: DELETE_POST, payload: postId });
      toast.success('Post Deleted Successfully')
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete the post ')
    } finally {
      setStatus({ ...status, loading: false });
    }
  };
  useEffect(() => {
    fetchPostsFromApi();
  }, []);

  return (
    <PostContext.Provider
      value={{
        allUsers,
        posts,
        status,
        user, 
        editPost,
        dispatch,
        setStatus,
        addNewPost,
        setUser,
        deletePost
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
