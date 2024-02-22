import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getNotiGame } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import imgPage from "../../images/logoPortada.svg";

const Start = ({ setListHiden }) => {
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  const [filterNotis, setFilterNotis] = useState([]);
  const dispatch = useDispatch();
  const notificationsGame = useSelector((state) => state.notificationsGame);

  const filterNotifications = () => {
    setFilterNotis(
      notificationsGame.filter((noti) => noti.userIdInvitation === userId)
    );
  };

  useEffect(() => {
    filterNotifications();
  }, [notificationsGame]);

  useEffect(() => {
    dispatch(getNotiGame());
  }, []);

  return (
    <div className="d-flex justify-center items-center flex-col gap-4 bg-purple-800 h-[calc(100vh-40px)] sm:h-[calc(100vh-58px)]">
      <img src={imgPage} alt="img-portada" className=" w-52 sm:w-72 " />
      <div className="d-flex justify-center items-center flex-col gap-2">
        <input
          type="button"
          value="Partida Simple"
          className=" bg-gray-900 hover:bg-gray-800 w-64 rounded-2 shadow-md hover:shadow-purple-200 text-center py-1 text-white font-bold"
          onClick={() => navigate("/simpleGame")}
        />
        <input
          type="button"
          value="Jugar Con un amigo"
          onClick={() => setListHiden(false)}
          className=" bg-gray-900 hover:bg-gray-800 w-64 rounded-2 shadow-md hover:shadow-purple-200 text-center py-1 text-white font-bold"
        />
        <input
          type="button"
          value="Partida multi al azar"
          className=" bg-gray-900 hover:bg-gray-800 w-64 rounded-2 shadow-md hover:shadow-purple-200 text-center py-1 text-white font-bold"
          onClick={() => navigate("/tables")}
        />
      </div>
    </div>
  );
};
export default Start;
