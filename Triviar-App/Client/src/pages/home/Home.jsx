import Start from "../../components/start/Start";
import FriendList from "../../components/friendList/FriendList";
import { useState } from "react";
import Header from "../../components/header/Header";
import SearchBar from "../../components/searchBar/SearchBar";
import NavMobile from "../../components/navMobile/NavMobil";
import Notifications from "../../components/notifications/Notifications";

const Home = ({ setResSearch, getFriends, friends }) => {
  const [ listHiden, setListHiden ] = useState(true);
  const [ hidenNotis, setHidenNotis ] = useState(false);
  const [ search, setSearch ] = useState(false);  
  const [ hidden, setHidden ] = useState(true);

  return(
   
    <div className="w-full relative d-flex flex-col justify-center  ">    
      <Header 
      setHidenNotis={setHidenNotis} 
      hidenNotis={hidenNotis} 
      search={search} 
      setSearch={setSearch} 
      hidden={hidden}
      setHidden={setHidden}
      />
      <NavMobile 
        hidden={hidden} 
        setHidden={setHidden}
        hidenNotis={hidenNotis}
        setHidenNotis={setHidenNotis}
      />
      <SearchBar search={search} setSearch={setSearch} setResSearch={setResSearch}/>
      <Start setListHiden={setListHiden}/>

      <FriendList 
      listHiden={listHiden} 
      setListHiden={setListHiden}
      getFriends={getFriends}
      friends={friends}
      />
      <div
      className={`${hidden  ? "none" : "top-0 fixed z-0 w-full h-screen bg-gray-600 opacity-90"}`}
      onClick={()=>setHidden(!hidden)}
      ></div>
      <Notifications setHidenNotis={setHidenNotis} hidenNotis={hidenNotis}/>
      <div 
        className={`${hidenNotis ? "w-full h-screen fixed z-0  top-0 bg-gray-500 opacity-50" : "d-none"}`}
        onClick={()=>setHidenNotis(!hidenNotis)}
      >
      </div>

    </div>
  );
}

export default Home;