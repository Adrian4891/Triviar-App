import { useEffect, useRef } from "react";
import Messages from "../messages/Messages";
import ListUsersChat from "../listUsersChat/ListUsersChat";

const TagChat = ({
  chats,
  profiles,
  setSelectMsg,
  selectUser,
  setOpenPriv,
}) => {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [chats]);

  return (
    <div className=" d-flex w-full  h-3/5  rounded bg-dark ">
      <div
        className="md:w-3/4 w-5/6 p-2 overflow-y-scroll h-3/7"
        ref={chatMessagesRef}
      >
        {chats.map((chat) => {
          return (
            <Messages
              id={chat.id}
              userName={chat.userName}
              message={chat.message}
              hour={chat.hour}
              messageRef={chat.messageRef}
              userNameResponse={chat.userNameResponse}
              propMessage={chat}
              setSelectMsg={setSelectMsg}
            />
          );
        })}
      </div>
      <ListUsersChat
        profiles={profiles}
        selectUser={selectUser}
        setOpenPriv={setOpenPriv}
      />
    </div>
  );
};

export default TagChat;
