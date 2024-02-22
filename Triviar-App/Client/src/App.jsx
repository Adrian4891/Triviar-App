import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import MultiPlay from "./pages/multiPlay/MultiPlay";
import CreateProfile from "./components/createProfile/CreateProfile";
import Cookies from "js-cookie";
import axios from "axios";
import { URL_BASE } from "./utils";
import { getProfile } from "./redux/actions";
import { useDispatch } from "react-redux";
import Profile from "./components/profile/Profile";
import ResultsSearch from "./components/resultsSearch/ResultsSearch";
import GameSimple from "./pages/gameSimple/GameSimple";
import TablesGame from "./components/tablesGame/TablesGame";
import UserProfile from "./components/userProfile/UserProfile";
import Welcome from "./components/welcome/Welcome";
import AvatarsImg from "./components/avatarsImg/AvatarsImg";
import NotFound from "./pages/notFound/NotFound";
import Spinner from "./components/spinner/Spinner";

function App() {
  const [hidenNotis, setHidenNotis] = useState(false);
  const dispatch = useDispatch();
  const [resSearch, setResSearch] = useState([]);
  const userId = Cookies.get("userId");
  const [friends, setFriends] = useState([]);
  const [load, setLoad] = useState(true);

  const getFriends = async () => {
    try {
      const { data } = await axios(`${URL_BASE}/friends/${userId}`);
      setFriends(data);
    } catch (error) {
      console.log(error.message);
      setFriends([]);
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setHidenNotis={setHidenNotis}
              hidenNotis={hidenNotis}
              setResSearch={setResSearch}
              getFriends={getFriends}
              friends={friends}
            />
          }
        />
        <Route path="/chat" element={<Chat load={load} setLoad={setLoad} />} />
        <Route
          path="/simpleGame"
          element={<GameSimple load={load} setLoad={setLoad} />}
        />
        <Route path="/signIn" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/multiPlay"
          element={<MultiPlay load={load} setLoad={setLoad} />}
        />
        <Route path="/profile/create" element={<CreateProfile />} />
        <Route path="/avatars" element={<AvatarsImg />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/user/profile/:id"
          element={
            <UserProfile
              friends={friends}
              getFriends={getFriends}
              load={load}
              setLoad={setLoad}
            />
          }
        />
        <Route
          path="/profile/results/search"
          element={<ResultsSearch resSearch={resSearch} />}
        />
        <Route
          path="/tables"
          element={<TablesGame load={load} setLoad={setLoad} />}
        />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/spiner" element={<Spinner />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
