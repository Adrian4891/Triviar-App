import { useState, useEffect } from "react";
import { URL_BASE } from "../../utils";
import HeaderChatTag from "../../components/headerChatTag/HeaderChatTag";
import TagChat from "../../components/tagChat/TagChat";
import FormChatMain from "../../components/formChatMain/FormChatMain";
import PrivTagChat from "../../components/privChat/PrivTagChat";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import Spinner from "../../components/spinner/Spinner";
import { useNavigate } from "react-router-dom";


let socket = io(URL_BASE);

const Chat = ({load, setLoad}) => {
    const [ chats, setChats ] = useState([]);
    const [ profiles, setProfiles ] = useState([]);
    const [ inpText , setInpText ] = useState("")
    const [ selectMsg, setSelectMsg ] = useState({});
    const [ userMsgPriv, setUserMsgPriv ] = useState([]);
    const [ openPriv, setOpenPriv ] = useState(false);
    const [ windUser, setWindUser ] = useState({}); //aca va el user en que se posiciono la ventana
    const [ messagesPriv, setMessagesPriv ] = useState([]);
    const profile = useSelector(state=> state.profile);
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    let messagePriv = {};
    let userMsg = {};
    const userId = Cookies.get("userId");
    const navigate = useNavigate();
    let user ;


  useEffect(()=>{
    setLoad(true);
    socket = io(URL_BASE);
    setTimeout(() => {
        if(!userId) return navigate("/signIn");
       setLoad(false);
    }, 1500);
    return()=>{
        socket.disconnect();
    }
  },[])

  useEffect(()=>{
    socket.emit("join",profile);
    socket.on("getUsers",(arrUsers)=>{
        setProfiles(arrUsers);
        user=arrUsers
    });
  },[user]);


 /// selecione el usuario para el priv
    const selectUser = (userPv) => {
        setWindUser(userPv)
       const findUser = userMsgPriv.find(item=> item.userName === userPv.userName);
       if(findUser) return;
       setUserMsgPriv([...userMsgPriv, userPv]);//lista de pvs
    }

    const closePriv = (userName) => {
        const filterPrivs = userMsgPriv.filter((item => item.userName !== userName));
        setUserMsgPriv(filterPrivs);
    }

    const handleChange = (event) => {
       setInpText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!openPriv){
            if(selectMsg.userName){
                // el obj a responder
                userMsg = {
                    id:uuidv4(),
                  userName : profile.userName,
                  message: inpText,
                  messageRef: selectMsg.message,
                  userNameResponse: selectMsg.userName,
                  hour: `${hour}:${minutes}:${seconds}`
                };
            }
            else {
                //el mensaje común
                userMsg = {
                    id:uuidv4(),
                    userId,
                    userName : profile.userName,
                    message: inpText,
                    hour: `${hour}:${minutes}:${seconds}`
                };
            }
            setChats([...chats, userMsg]);

            socket.emit("userMsg", userMsg);
            setSelectMsg({});
            setInpText("")
            return;
        } else {
            if(!selectMsg.userName){
                //msg pv 
                messagePriv = {
                    id:uuidv4(),
                    userIdA: userId,
                    userIdB: windUser.userId,
                    userName: profile.userName,
                    message:inpText,
                    checkMsg:false,
                    hour: `${hour}:${minutes}:${seconds}`
                }
                
                console.log(messagePriv)
            }
            else {
                // res msg pv
                messagePriv = {
                    id:uuidv4(),
                    userIdA: userId,
                    userIdB: windUser.userId,
                    userName: profile.userName,
                    message: inpText,
                    messageRef: selectMsg.message,
                    userNameResponse: selectMsg.userName,
                    checkMsg:false,
                    hour: `${hour}:${minutes}:${seconds}`
                }
            }
            setMessagesPriv([... messagesPriv, messagePriv]);
            
            socket.emit("messagePriv", messagePriv);
            const userSend = profile;
            if(userSend.userId !== windUser.userId){
                socket.emit("userSend", userSend);
            }
            setInpText("");
            setSelectMsg({});
        }
    }

    useEffect(()=>{
       const receiveMessages = (userMsg) => {
          setChats([...chats, userMsg])
       }
       socket.on("userMsg", receiveMessages);
       return ()=> {
        socket.off("userMsg", receiveMessages);
       }
    },[chats]);

    useEffect(()=>{
        const receiveMessagesPriv = (messagePriv) => {
            if(messagePriv.userIdB === userId  || messagePriv.userIdA === userId){
              setMessagesPriv([...messagesPriv, messagePriv]);
            }
        }
        socket.on("messagePriv", receiveMessagesPriv )
        return ()=> {
           socket.off("messagePriv", receiveMessagesPriv);
        }
     },[messagesPriv]);
    
    useEffect(()=>{
        const alertPrivMsg = (userSend) =>{
            const findWindUser = userMsgPriv.find(priv => priv.userId === userSend.userId);
            if(!findWindUser ){ 
                setUserMsgPriv([...userMsgPriv, userSend]);
                setWindUser(userSend);
            }
        }
        socket.on("userSend", alertPrivMsg, );
        
        return () => {
            socket.off("userSend", alertPrivMsg);
        };
    },[messagesPriv]);

    if(load){
        return(
           <Spinner/>
        )
        
    }

    
    return(
        <div className="flex justify-center items-center h-screen w-full  bg-gradient-to-r from-blue-600 to-orange-500">
           <section className="flex justify-right flex-col rounded-1 h-screen md:h-5/6 px-4 py-3 bg-orange-300 gap-2  md:w-2/3">
    
               <HeaderChatTag
               closePriv={closePriv}
               userMsgPriv={userMsgPriv}
               setOpenPriv={setOpenPriv}
               setWindUser={setWindUser}
               />

                { !openPriv ?
                    <TagChat 
                    chats={chats} 
                    profiles={profiles} 
                    setSelectMsg={setSelectMsg}
                    selectUser={selectUser}
                    setOpenPriv={setOpenPriv}
                    />
                    :
                    <PrivTagChat
                    messagesPriv={messagesPriv}
                    setSelectMsg={setSelectMsg}
                    windUser={windUser}
                    userId={userId}
                    />
                }
          
               <FormChatMain 
               handleChange={handleChange}
               handleSubmit={handleSubmit}
               selectMsg={selectMsg} 
               setSelectMsg={setSelectMsg} 
               inpText={inpText}
               />
           </section>
        </div>
    );
}

export default Chat;