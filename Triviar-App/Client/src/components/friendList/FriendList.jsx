import axios from "axios";
import { useState, useEffect } from "react";
import { URL_BASE } from "../../utils";
import { useDispatch } from "react-redux";
import { postNotiGames } from "../../redux/actions";
import Cookies from "js-cookie";

const FriendList = ({listHiden, setListHiden, getFriends, friends}) => { 
  
    const userId = Cookies.get("userId");
    const dispatch = useDispatch();

    const getProfilePlayer = async (id) => {
        try {
            const { data } = await axios(`${URL_BASE}/profile/${id}`);
            const player = data[0];
            setProfilePlayer(player);    
        } catch (error) {
            console.log(error.message);
        }
    };

    const sendNotification = (friend) => {
        dispatch(postNotiGames(userId, friend));
        getProfilePlayer(friend.friendId);
    };

    useEffect(()=>{
       getFriends();
    },[]);

    return(
        <>
            <div className={`d-flex items-center justify-center flex-col fixed bg-blue-200 border rounded-2 w-80 bottom-1 z-10 left-[calc(100%-90%)] sm:left-[calc(100%-63%)]
            ${listHiden ? "transition duration-700 translate-y-96" : 
            "transition duration-700 " }`}>
                <div className=" d-flex justify-center items-center justify-between flex-col px-2 w-64 h-80 bg-white ">
                    <span 
                    onClick={()=>setListHiden(!listHiden)}
                    className="w-full text-right p-2 text-purple-500 font-bold cursor-pointer" 
                    >X</span>
                    <ul className=" h-64 w-full overflow-y-scroll d-flex justify-start items-center flex-col ">
                        { friends.length > 0 && friends.map((friend)=>{
                            return(
                                
                                <li 
                                onClick={()=>sendNotification(friend, setListHiden(!listHiden))}
                                key={friend._id}
                                className="cursor-pointer text-gray-600 font-bold hover:text-gray-500 "
                                >
                                    {friend.userName}
                                
                                </li>
                            )})
                        }
                    </ul>
                </div>
                <p 
                className="text-center mb-2 mt-2 text-purple-500 transition hover:duration-500 font-bold">
                {friends.length > 0 ? `Lista de amigos` :  `Agrega amigos`}
                </p>
            </div>
            <div 
            className={`${ listHiden ? "none" : "w-full h-screen fixed top-0 bg-gray-200 z-0 opacity-80 block"   }`}
            onClick={()=>setListHiden(!listHiden)}
            >
            </div>
        </>
    );
}

export default FriendList;