import { Routes, Route } from 'react-router-dom'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import Home from './pages/Home';
import PostDetails from './pages/DetailsPage';
import Header from './components/Header';
import style from './constants/styleModal';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { usePosts } from './context/postContext';
import MyToastContainer from './components/ToastContainer';
function App() {
  const {setUser,allUsers, user} = usePosts()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
useEffect(()=>{
  handleOpen()
}, [])
  return (
    <div className="App">
      <MyToastContainer/>
 <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>To be able to Edit or Delete post You need to Sign in as a User</h2>
          {
            user>0 && <p>Currently signed in as <strong>User {user}</strong></p>
          }
          <InputLabel id="demo-simple-select-label">Select User</InputLabel>
          <Select sx={{ minWidth: 140 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
          label="User"
          onChange={(e)=>{setUser(e.target.value); handleClose()}}
        >
        
          {
            allUsers?.map(item=> <MenuItem key={item} value={item}>{`User ${item}`}</MenuItem>)
          }
        </Select>
        
        </Box>
      </Modal>
      <Header handleOpen={handleOpen}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:postId' element={<PostDetails />} />
      </Routes>

    </div>
  );
}

export default App;
