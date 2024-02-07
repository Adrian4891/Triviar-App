import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CardProfile = ({userId, userName, picture, points, country, birthday, friendCheck, addFriend, deleteFriend}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const myUserId = Cookies.get("userId");

    return(
        <section className="min-h-screen w-full bg-indigo-400 p-2">
            <button className="rounded-2 bg-gray-800 py-1 px-4 text-white hover:bg-gray-700 hover:shadow-md hover:shadow-gray-600"
            onClick={()=>navigate("/")}
            >Volver</button>
            <article className="flex justify-start items-center flex-col p-3">
                <img 
                src={picture}
                alt="image-profile" 
                className="mb-4 rounded-full w-52 h-52 md:w-64 md:h-64"
                />
                <div className="flex item-center flex-col gap-2 font-semibold">
                    <h1 className="text-2xl md:text-3xl">User Name: {userName}</h1>
                    <h3 className="text-2xl">Score: {points}</h3>
                    <p className="text-2xl">Country: {country}</p>
                    <p className="text-2xl">Birthday: {birthday}</p>
                    {!friendCheck?.userId && location.pathname === `/user/profile/${userId}` && userId !== myUserId  && 
                     <button 
                     className="bg-blue-600 text-white py-1 px-3 mt-2 rounded-1 hover:bg-blue-500 hover:shadow-lg hover:shadow-indigo-300"
                     onClick={()=>addFriend(myUserId)}
                    >Add Friend</button>}
                    {friendCheck?.userId &&
                    <button className="bg-blue-600 text-white py-1 px-3 mt-2 rounded-1 hover:bg-blue-500 hover:shadow-lg hover:shadow-indigo-300"
                    onClick={()=>deleteFriend(friendCheck)}
                    >delete friend</button>}
                </div>
            </article>
        </section>
    )
}

export default CardProfile;