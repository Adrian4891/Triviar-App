const HeaderChatTag = ({closePriv, userMsgPriv, setOpenPriv, setWindUser }) => {
    return(
        <div className="d-flex justify-start gap-1 p-2  bg-dark rounded text-xs md:text-md w-full">
            <span
            onClick={()=>setOpenPriv(false)}
            className="border-1 border-orange-300 rounded-1 bg-dark px-2 font-semibold text-sky-600 cursor-pointer"
            >Sala General</span>
            { userMsgPriv.length > 0 && userMsgPriv.map((priv)=>{
                return(
                    <div className="d-flex px-1 font-semibold bg-sky-600 text-orange-300 rounded-1 border-1 border-sky-300 overflow-scroll-auto cursor-pointer" 
                    key={priv.userId}
                    >
                        <p onClick={()=>setOpenPriv(true, setWindUser(priv))}>
                            {priv.userName}
                        </p>
                        <span 
                        className="pl-2 text-orange-300 hover:text-orange-500 cursor-pointer"
                        onClick={()=>closePriv(priv.userName, setOpenPriv(false))}
                        >x</span>
                    </div>
                )
            })}
        </div>
    );
}

export default HeaderChatTag;