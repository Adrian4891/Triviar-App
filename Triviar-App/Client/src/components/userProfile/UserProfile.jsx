import CardProfile from "../cardProfile/CardProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = ({ friends}) => {
    const [ friendCheck, setFriendCheck ] = useState({});
    const navigate = useNavigate();
    const [ profileUser, setProfileUser ] = useState({});
    const params = useParams();
    
    const getUserProfile = async () => {
        try {
            const { data } = await axios(`${URL_BASE}/profile/${params.id}`);
            if(data[0].userName){
                setProfileUser(data[0]);
                const findFriend = friends.find(friend => friend.friendId === data[0].userId);
                setFriendCheck(findFriend);
           }
        } catch(error){
          console.log(error);
        }
      }

    const addFriend = async (id) => {
        try {
            const { data } = await axios.post(`${URL_BASE}/friends/${id}`, profileUser);
            alert("agregado");
            navigate("/");
            
        } catch(error){
            console.log(error);
        }
    };
    
    
    const deleteFriend = async (friend) => {
        try {
            const { data } = await axios.delete(`${URL_BASE}/friends/?userId=${friend.userId}&friendId=${friend.friendId}`);          
            alert("borrado")
            navigate("/");
        } catch(error){
            console.log(error);
        }
    };
    
    
    useEffect(()=>{
        getUserProfile();
    },[]);
    
    
    return(
        <CardProfile
         userId={profileUser?.userId}
         userName={profileUser?.userName}
         picture={profileUser?.picture}
         points={profileUser?.points}
         country={profileUser?.country}
         birthday={profileUser?.birthday}
         friendCheck={friendCheck}
         addFriend={addFriend}
         deleteFriend={deleteFriend}
        />  
    );
}

export default UserProfile;