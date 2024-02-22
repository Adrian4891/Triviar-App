import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { delDataProfile } from "../../redux/actions";
import Notifications from "../notifications/Notifications";
import { FiAlignCenter } from "react-icons/fi";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import imgHeader from "../../images/headerLogo.svg";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = ({
  setHidenNotis,
  hidenNotis,
  search,
  setSearch,
  hidden,
  setHidden,
}) => {
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const profile = useSelector((state) => state.profile);
  const signOut = () => {
    dispatch(delDataProfile());
    Cookies.set("userId", "", 0);
    navigate("/signIn");
  };

  return (
    <header className="flex items-end justify-around  bg-purple-800 ">
      <img src={imgHeader} alt="img-header" className=" w-12 sm:w-20" />
      <nav className="md:flex hidden ">
        <ul className="flex justify-center gap-10 text-md font-bold text-white">
          <li>
            <Link to="/" className="hover:underline decoration-2">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/chat" className="hover:underline decoration-2">
              Chat
            </Link>
          </li>
          <li>
            <button
              className="hover:underline decoration-2 shadow-xl"
              onClick={() => setHidenNotis(!hidenNotis)}
            >
              Notificaciones
            </button>
            <Notifications
              setHidenNotis={setHidenNotis}
              hidenNotis={hidenNotis}
            />
          </li>
          <li>
            {!userId ? (
              <Link
                to="/signIn"
                className="hover:underline decoration-2 shadow-xl"
              >
                SignIn
              </Link>
            ) : (
              <div className="flex flex-col relative">
                <p
                  className="text-white cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  {profile?.userName} <IoMdArrowDropdown className="inline" />
                </p>
                {open && (
                  <div className="border-1 rounded-1 border-yellow-400 fixed top-14 flex flex-col pt-1 pb-2 px-3 bg-purple-600">
                    <Link
                      to="/profile"
                      className="hover:underline decoration-2 text-sm"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/signIn"
                      className="hover:underline decoration-2 text-sm"
                      onClick={signOut}
                    >
                      SignOut
                    </Link>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div className="flex items-end gap-4 ">
        <button
          className="text-white pt-4"
          disabled={!userId ? "true" : false}
          onClick={() => setSearch(!search)}
        >
          <FaSearch />
        </button>
        <IoNotificationsSharp
          className="block md:hidden text-white cursor-pointer"
          onClick={() => setHidenNotis(!hidenNotis)}
        />
        <FiAlignCenter
          className="block md:hidden text-white cursor-pointer text-xl"
          onClick={() => setHidden(!hidden)}
        />
      </div>
    </header>
  );
};

export default Header;
