import { Link, useNavigate } from "react-router-dom";
import Notifications from "../notifications/Notifications";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { delDataProfile } from "../../redux/actions";
import { IoHomeOutline } from "react-icons/io5";
import { BsPersonVcard } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsPersonDash } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";

const NavMobile = ({ hidden, setHidden, hidenNotis, setHidenNotis }) => {
  let userId = Cookies.get("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(delDataProfile());
    Cookies.set("userId", "", 0);
    navigate("/signIn");
  };

  return (
    <div
      className={`h-screen w-80 flex fixed  z-20 top-0 right-0 bg-purple-200 ${
        hidden
          ? "transition duration-700 translate-x-80"
          : " transition duration-700"
      }`}
    >
      <span
        className="p-2 h-10 text-gray-500 cursor-pointer font-semibold"
        onClick={() => setHidden(!hidden)}
      >
        X
      </span>
      <nav className="flex flex-col w-50 items-end py-12">
        <ul className="flex justify-center  flex-col gap-10 text-md font-bold text-gray-500">
          <li>
            <Link
              to="/"
              className="hover:underline decoration-2"
              onClick={() => setHidden(!hidden)}
            >
              <IoHomeOutline className="inline pb-1 text-xl" /> Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
              className="hover:underline decoration-2"
              onClick={() => setHidden(!hidden)}
            >
              <IoChatboxEllipsesOutline className="inline pb-1 text-xl" /> Chat
            </Link>
          </li>
          <li>
            <button
              className="hover:underline decoration-2"
              onClick={() => setHidenNotis(!hidenNotis)}
            >
              <IoIosNotificationsOutline className="inline pb-1 text-xl" />{" "}
              Notificaciones
            </button>
          </li>
          <li>
            <Link className="hover:underline decoration-2" to="/profile">
              <BsPersonVcard className="inline pb-1 text-xl" /> Perfil
            </Link>
          </li>
          <li className="hover:underline decoration-2">
            {!userId ? (
              <Link to="/signIn">
                <BsPersonCircle className="inline pb-1 text-xl" /> signIn
              </Link>
            ) : (
              <Link to="/signIn" onClick={() => signOut(setHidden(!hidden))}>
                <BsPersonDash className="inline pb-1 text-xl" /> signOut
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavMobile;
