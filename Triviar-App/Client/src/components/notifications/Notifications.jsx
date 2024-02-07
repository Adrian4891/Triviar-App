import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotiGame, deleteNotiGame, createGame, createDataGame } from "../../redux/actions";
import axios from "axios";
import { URL_BASE } from "../../utils";
import Cookies from "js-cookie";
import io from "socket.io-client";

const socket = io(`${URL_BASE}`);
   
const Notifications = ({setHidenNotis, hidenNotis}) => {
    
    const navigate = useNavigate();
    const userId = Cookies.get("userId");
    const [ filterNotis, setFilterNotis ] = useState([]);
    const dispatch = useDispatch();
    const notificationsGame = useSelector(state=> state.notificationsGame);
    const players = useSelector(state=> state.players);
   
    const checkedNotifications = async (id) => {
        try {
            const { data } = await axios.put(`${URL_BASE}/notificationsGame/${id}`);
                dispatch(createGame(data));
                if(data.checked){
                dispatch(createDataGame(data));
                socket.emit("data", data);
            } 
            navigate("/multiPlay");
            deleteNoti(id);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
       const checkNotification = (data) =>{
           dispatch(createGame(data));
           navigate("/multiPlay");
           dispatch(createDataGame(data));
       }

       socket.on("data", checkNotification);
       return () => {
        socket.off("data", checkNotification);
       }
    },[]);

    const deleteNoti = async (id) => {
        try {
            const { data } = await axios.delete(`${URL_BASE}/notificationsGame/${id}`);
            const notisFilters = notificationsGame.filter(noti=> noti._id !== id);
            dispatch(deleteNotiGame(notisFilters)); 
        } catch(error){
            console.log(error);
        }
    }

    const filterNotifications = () => {
       setFilterNotis(notificationsGame.filter(noti => 
           noti.userIdInvitation === userId || noti.userId === userId 
        ));
    }

    useEffect(()=>{
      filterNotifications();
    },[notificationsGame]);
    
    useEffect(()=>{
        dispatch(getNotiGame());
    },[hidenNotis]);

    return(
        <>
            <div className={`bg-purple-300 fixed z-30 p-2 d-flex justify-start items-center flex-col gap-3 rounded-2 scroll-auto 
             ${hidenNotis ? "h-96 md:w-2/4 w-72 md:top-5 md:left-72 top-2 left-5" : "d-none"} `}>
                <div className="w-full text-right">
                    <span 
                    className="text-slate-50 font-semibold cursor-pointer text-shadow-lg text-shadow-gray-500 "
                    onClick={()=>setHidenNotis(!hidenNotis)}
                    >Cerrar</span>
                </div>
                {
                filterNotis.length > 0 && filterNotis.map((noti)=>{
                        return(
                            <>
                            { !noti.checked && userId === noti.userIdInvitation &&
                                <div 
                                key={noti._id}
                                className="bg-white rounded-2 px-2 py-3 relative w-full hover:border hover:border-purple-600 cursor-pointer shadow-gray-400 shadow-md hover:shadow-purple-500"
                                >
                                    <div className="text-white">
                                        <p className="mb-2 text-gray-500 text-bold"
                                        >{`${noti.userName} te invito a jugar`}</p>
                                        <button
                                        className="rounded-1 shadow-green-300 hover:shadow-gray-400 shadow-md font-semibold px-2 py-1 mr-4 bg-green-500 hover:bg-white hover:text-green-500 hover:border hover:border-green-500"
                                        onClick={()=>checkedNotifications(noti._id, setHidenNotis(!hidenNotis))}
                                        >Aceptar</button>
                                        <button
                                        className="rounded-1 shadow-red-300 hover:shadow-gray-400 shadow-md font-semibold px-2 py-1 bg-red-500  hover:text-red-500 hover:bg-white hover:border hover:border-red-500 "
                                        onClick={()=>deleteNoti(noti._id, setHidenNotis(!hidenNotis))}
                                        >Rechazar</button>
                                    </div> 
                                </div>
                                }
                            </>
                        )
                    })
                }
            </div>
           

        </>
    );
}

export default Notifications;