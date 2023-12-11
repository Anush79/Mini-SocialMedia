import { useState } from "react";
import { usePosts } from "../context/postContext";


export default function NewForm({ closeFunc, toEditData }) {
  const { addNewPost, editPost , user} = usePosts();
  const [postBody, setBody] = useState(
    toEditData ?? {
      id:'',
      userId:user,
      title: "",
      body: "",
      userPost: true,
    }
  );
 
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setBody((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmitFunction = () => {
    if (toEditData) {
     editPost(postBody)
    }
    else addNewPost(postBody);

    closeFunc();
  };
  return (
    <div>
      <form onSubmit={onSubmitFunction}>
        <input
          type="text"
          name="title"
          required
          placeholder="Enter Title"
          aria-label="Enter title for the post"
          value={postBody.title}
          onChange={onChangeHandler}
        />
        <textarea
          name="body"
          id=""
          cols="30"
          rows="10"
          placeholder="Write Body of your post here"
          value={postBody.body}
          required
          onChange={onChangeHandler}
        ></textarea>
        <button>{toEditData ? "Save Edit" : "Post "}</button>
      </form>
    </div>
  );
}
