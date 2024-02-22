import { useNavigate } from "react-router-dom";

const CardFriend = ({
  friends,
  sendNotification,
  setListHiden,
  listHiden,
  deleteFriend,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {" "}
      {friends.length > 0 &&
        friends.map((friend) => {
          return (
            <div
              onClick={() => sendNotification(friend, setListHiden(!listHiden))}
              key={friend._id}
              className="text-gray-600 font-bold py-1 px-4 border-1 border-purple-500 rounded-1 mb-2"
            >
              <img
                src={friend.picture}
                alt="image-card"
                className="w-12 h-12 rounded-full cursor-pointer"
                onClick={() => navigate(`/user/profile/${friend.friendId}`)}
              />
              <p>{friend.userName}</p>
              <div className="flex gap-2">
                <button
                  className="bg-red-600 text-white font-semibol py-1 px-2 rounded-1 text-sm hover:bg-red-500 hover:shadow-md hover:shadow-gray-400"
                  onClick={() => deleteFriend(friend)}
                >
                  Borrar
                </button>
                <button
                  className="bg-sky-600 text-white font-semibol py-1 px-2 rounded-1 text-sm hover:bg-sky-500 hover:shadow-md hover:shadow-gray-400"
                  onClick={() =>
                    sendNotification(friend, setListHiden(!listHiden))
                  }
                >
                  Jugar
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CardFriend;
