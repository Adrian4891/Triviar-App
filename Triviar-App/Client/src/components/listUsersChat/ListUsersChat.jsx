import { IoMdPerson } from "react-icons/io";

const ListUsersChat = ({profiles, selectUser, setOpenPriv}) => {
    return(
        <div className="bg-dark flex justify-start items-start flex-col w-24 md:w-1/4  p-1 md:p-3   
        border-l border-sky-300 overflow-y-scroll text-sky-600 text-xs md:text-md"
        > 
            { profiles.map((profile)=>{
                return(
                    <div 
                    key={profile._id}
                    className="flex items-center gap-2 cursor-pointer hover:text-sky-500"
                    >
                        <IoMdPerson className="text-green-500"/>
                        <p 
                        onClick={()=>selectUser(profile, setOpenPriv(true))}
                        className="font-semibold "
                        >
                          {profile.userName}
                        </p>
                </div>
            )})}
        </div>
    )
}

export default ListUsersChat;