import { FaRocketchat } from "react-icons/fa";

const ChatInPlay = ({open, setOpen, arrMsg, handleSumbmit, handleInput, inpValue}) => {
    return(
        <div className={`fixed  top-1 right-50  border-none bg-white d-flex justify-end flex-col rounded
        ${open ? "transition duration-75 w-80 h-80" : "w-80- h-80-"}`
        }>
           {open ?  <div 
            className="border-3 rounded-2 w-80 bg-blue-400 px-2 font-bold text-white cursor-pointer"
            onClick={()=>setOpen(!open)}
            >
              Cerrar
            </div>:
            
            <div 
            className="text-2xl rounded bg-blue-400 py-3 font-bold text-white rounded-10"
            onClick={()=>setOpen(!open)}
            >
              <FaRocketchat/>
            </div>
            }
            <div className={`${open ? "h-64 px-2 py-1 overflow-y-scroll" : "d-none"}`}>
                {
                    arrMsg.length > 0 && arrMsg.map((msg)=>{
                        return(
                            <p 
                            className="text-md text-zinc-600 font-semibold"
                            key={msg._id}
                            >
                                {msg.userName}: {msg.message}  
                            </p>
                        )
                    })
                }
            </div>
            <form 
            onSubmit={handleSumbmit}
            className={`${open ? "d-flex flex-col-reverse gap-2 h-30 px-1 py-2 bg-blue-100 rounded" : "d-none"}`} 
            >
                <input 
                type="submit" 
                className="bg-blue-500 text-white font-semibold py-1 rounded-1 hover:bg-blue-400"
                />
                <textarea
                type="text" 
                value={inpValue}
                onChange={handleInput}
                className="px-2 py-1 rounded-1 resize-none text-md text-zinc-600 font-semibold focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Escribe tu mensaje ..."
                />
            </form>
        </div>
    );
}

export default ChatInPlay;