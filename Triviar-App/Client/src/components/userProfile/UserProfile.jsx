import CardProfile from "../cardProfile/CardProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_BASE } from "../../utils";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import Swal from "sweetalert2";

const UserProfile = ({ friends, getFriends, load, setLoad }) => {
  const [friendCheck, setFriendCheck] = useState({});
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState({});
  const params = useParams();

  const getUserProfile = async () => {
    try {
      const { data } = await axios(`${URL_BASE}/profile/${params.id}`);
      if (data[0].userName) {
        setProfileUser(data[0]);
        const findFriend = friends.find(
          (friend) => friend.friendId === data[0].userId
        );
        setFriendCheck(findFriend);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFriend = async (id) => {
    try {
      const { data } = await axios.post(
        `${URL_BASE}/friends/${id}`,
        profileUser
      );
      //alert("agregado");
      Swal.fire({
        title: `${profileUser.userName}`,
        text: "Se agrego a tu lista exitosamente!!!",
        imageUrl: profileUser.picture,
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      getFriends();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFriend = async (friend) => {
    try {
      const { data } = await axios.delete(
        `${URL_BASE}/friends/?userId=${friend.userId}&friendId=${friend.friendId}`
      );
      getFriends();
      Swal.fire({
        title: `${friend.userName}`,
        text: "Fue borrado exitosamente!!",
        imageUrl: friend.picture,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, []);

  if (load) {
    return <Spinner />;
  }

  return (
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
};

export default UserProfile;
