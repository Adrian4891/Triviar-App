import Messages from "../messages/Messages";
import { useEffect, useRef } from "react";

const PrivTagChat = ({ messagesPriv, setSelectMsg, windUser, userId }) => {
  const usersPrivsMessages = useRef(null);
  useEffect(() => {
    usersPrivsMessages.current.scrollTop =
      usersPrivsMessages.current.scrollHeight;
  }, [messagesPriv]);

  return (
    <div
      className=" d-flex flex-col w-full h-3/5 rounded bg-dark overflow-y-scroll"
      ref={usersPrivsMessages}
    >
      {messagesPriv.length > 0 &&
        messagesPriv.map((priv) => {
          if (
            (priv.userName === windUser.userName && priv.userIdB === userId) ||
            (priv.userIdA !== windUser.userId &&
              priv.userIdB === windUser.userId &&
              priv.userIdA === userId)
          ) {
            //el que manda         la ventana           recibe         ventana
            return (
              <Messages
                id={priv.id}
                userName={priv.userName}
                message={priv.message}
                hour={priv.hour}
                messageRef={priv.messageRef}
                userNameResponse={priv.userNameResponse}
                propMessage={priv}
                setSelectMsg={setSelectMsg}
              />
            );
          }
        })}
    </div>
  );
};

export default PrivTagChat;
