import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_AVATARS_API_KEY;

const AvatarsImg = ({ openList, setOpenList, userData, setUserData }) => {
  const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=memes`;
  const [avatars, setAvatars] = useState([]);

  const getImagesApi = async () => {
    try {
      const { data } = await axios(`${API_URL}`);
      console.log(data.hits[0].pageURL);
      if (data.hits) {
        setAvatars(data.hits);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getImagesApi();
  }, []);

  return (
    <>
      <div
        className={`${
          openList
            ? "bg-purple-600 p-2 fixed z-20 top-10 flex justify-center items-center justify-center justify-evenly w-full md:w-5/6 h-96  border-1 rounded-5 flex-wrap overflow-y-scroll"
            : "d-none"
        }`}
      >
        <span
          className="absolute top-0 right-0 m- rounded-full text-xl font-bold text-red-500 hover:text-red-400"
          onClick={() => setOpenList(!openList)}
        >
          X
        </span>
        {avatars.map((avatar, index) => {
          return (
            <img
              key={avatar.id}
              src={avatar.webformatURL}
              alt="img-avatar"
              className="w-20 h-20 lg:w-32 lg:h-32 m-3 rounded-full cursor-pointer"
              onClick={() =>
                setOpenList(
                  !openList,
                  setUserData({ ...userData, ["picture"]: avatar.webformatURL })
                )
              }
            />
          );
        })}
      </div>
      <div
        className={`${
          openList
            ? "bg-zinc-200 z-10 w-full h-screen fixed opacity-70"
            : "none"
        }`}
        onClick={() => setOpenList(!openList)}
      ></div>
    </>
  );
};

export default AvatarsImg;
