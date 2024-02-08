import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Chat from "./components/chat/Chat";
import Game from './pages/game/Game';
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp';
import MultiPlay from './components/multiPlay/MultiPlay';
import CreateProfile from './components/createProfile/CreateProfile';
import AvatarsImg from './components/avatarsImg/avatarsImg';
import Cookies from "js-cookie";
import axios from "axios";
import { URL_BASE } from './utils';
import { getProfile } from './redux/actions';
import { useDispatch} from 'react-redux';
import Profile from './components/profile/Profile';
import ResultsSearch from './components/resultsSearch/ResultsSearch';
import GameSimple from './components/gameSimple/GameSimple';
import TablesGame from './components/tablesGame/TablesGame';
import UserProfile from './components/userProfile/UserProfile';
import Welcome from './components/welcome/Welcome';

function App() {
  
  const [ hidenNotis, setHidenNotis ] = useState(false);
  const dispatch = useDispatch();
  const [ resSearch, setResSearch ] = useState([]);
  const userId = Cookies.get("userId");
  const [ friends, setFriends ] = useState([]);
  const [ load, setLoad ] = useState(true);

  const getFriends = async () => {
    try {
      const { data } = await axios(`${URL_BASE}/friends/${userId}`);
      setFriends(data);  
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(()=>{
    if(userId){
      dispatch(getProfile(userId));
    }
  },[]);
  
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Home 
          setHidenNotis={setHidenNotis} 
          hidenNotis={hidenNotis}
          setResSearch={setResSearch}
          getFriends={getFriends}
          friends={friends}
          />}
        />
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/simpleGame" element={<GameSimple load={load} setLoad={setLoad}/>}/>
        <Route path="/signIn" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/multiPlay" element={<MultiPlay load={load} setLoad={setLoad}/>}/>
        <Route path="/profile/create" element={<CreateProfile/>}/>
        <Route path="/avatars" element={<AvatarsImg/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/user/profile/:id" element={<UserProfile friends={friends}/>}/>
        <Route path="/profile/results/search" element={<ResultsSearch resSearch={resSearch}/>}/>
        <Route path="/tables" element={<TablesGame/>}/>
        <Route path="/welcome" element={<Welcome/>}/>

      </Routes>
    </>
  )
}

export default App
