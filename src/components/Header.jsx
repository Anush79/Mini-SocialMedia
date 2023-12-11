import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";


export default function Header({handleOpen}) {
  const {user} = usePosts()
  const navigate = useNavigate()
  return <header>
    <div className="logo pointer" onClick={()=>{navigate('/')}} >
    <img src='/logo192.png'  alt="logo pic"/>
    </div>
    <div className="flex">
      <span onClick={handleOpen} className="userProfile pointer">
        <img src="/user-avatar.png" alt="user profile pic"  aria-label="user profile pic"/>
        
      </span>
     User {user}

    </div>

  </header>
}