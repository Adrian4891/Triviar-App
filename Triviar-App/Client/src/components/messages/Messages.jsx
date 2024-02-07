import { IoArrowRedoOutline } from "react-icons/io5";

const Messages = ({id, userName, message, hour, messageRef, userNameResponse, propMessage, setSelectMsg}) => {
    return(
        <div className="border-1 border-orange-300 rounded p-2 d-flex flex-col m-2 relative " 
        key={id}
        >   
            {
            messageRef &&
            <p className=" flex flex-wrap border-1 border-orange-300 rounded p-1 text-ellipsis w-3/4 text-orange-400 
            text-[calc(1rem-5px)] md:text-xs text-orange-300 mb-1">
                {`${userNameResponse} : ${messageRef}`}
            </p>
            }
            <p className="text-ellipsis overflow-hidden min:w-96 text-xs md:text-sm  text-sky-300"
            >
                {userName}: {message}
                <span className="absolute bottom-0 right-0 text-xs text-[calc(1rem-8px)] pr-1 text-orange-300">
                    {hour}
                </span>
            </p>
            <button 
            className="p-1 absolute top-0  right-0 text-orange-300 text-xs md:text-md"
            onClick={()=>setSelectMsg(propMessage)}
            >
              <IoArrowRedoOutline/>
            </button>
   
        </div>
    )
}

export default Messages;