import { URL_BASE } from "../../utils";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { createGame, createDataGame } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import imgHeader from "../../images/Triviar sign.svg";
import Spinner from "../spinner/Spinner";

const socket = io(`${URL_BASE}`);

const TablesGame = ({ load, setLoad }) => {
  const [tables, setTables] = useState([]);
  const profile = useSelector((state) => state.profile);
  const userId = Cookies.get("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);

  const getTables = async () => {
    try {
      const { data } = await axios(`${URL_BASE}/tables`);
      setTables(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postTable = async () => {
    try {
      const newTable = {
        userId,
        userName: profile.userName,
      };
      const { data } = await axios.post(`${URL_BASE}/tables`, newTable);
      getTables();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTable = async (id) => {
    try {
      const { data } = await axios.delete(`${URL_BASE}/tables/${id}`);
      getTables();
    } catch (error) {
      console.log(error);
    }
  };

  const checkTable = async (id) => {
    try {
      const { data } = await axios.put(
        `${URL_BASE}/tables?userId=${id}&userIdInvitation=${userId}`
      );
      dispatch(createGame(data));
      setDatos(datos);
      if (data.checked) {
        dispatch(createDataGame(data));
        socket.emit("data", data);
      }
      if(data.userIdInvitation === userId){
        navigate("/multiPlay");
        deleteTable(data._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkedTable = (data) => {
      if(data.userId === userId){
        dispatch(createGame(data));
        navigate("/multiPlay");
        dispatch(createDataGame(data));
      }
    };
    socket.on("data", checkedTable);

    return () => {
      socket.off("data", checkedTable);
    };
  }, [datos]);

  useEffect(() => {
    getTables();
    setLoad(true);
    setTimeout(() => {
      if (!userId) return navigate("/signIn");
      setLoad(false);
    }, 1500);
  }, []);

  if (load) {
    return <Spinner />;
  }

  return (
    <section className="w-full min-h-screen bg-blue-100 flex justify-start items-center flex-col gap-5">
      <div className="flex items-center w-full text-sky-800 justify-center justify-around">
        <Link to="/" className="font-semibold hover:text-sky-600">
          Volver
        </Link>

        <img src={imgHeader} alt="Imagen triviar" className="w-24" />
      </div>
      <div className="flex justify-center items-center flex-wrap gap-5 pt-5">
        {tables.length < 1 && (
          <h1 className="font-semibold text-xl text-gray-400">
            Aún no hay mesas creadas.
          </h1>
        )}
        {tables.map((table) => {
          return (
            <div
              key={table._id}
              className="bg-white border rounded-2 w-96 h-24 shadow-md shadow-gray-300 flex justify-center items-center flex-col gap-2 relative hover:ring-2 hover:ring-blue-400 hover:shadow-lg hover:shadow-gray-400"
            >
              <p className="text-gray-500 font-semibold">{`Mesa creada por ${table.userName}`}</p>
              {userId === table.userId && (
                <button
                  className="absolute top-0 right-0 px-2 font-semibold text-red-600 hover:text-red-400"
                  onClick={() => deleteTable(table._id)}
                >
                  X
                </button>
              )}
              {userId !== table.userId && (
                <button
                  className="bg-gray-700 hover:bg-gray-900 font-semibold rounded-1 text-white py-1 px-3 w-24 shadow-md shadow-gray-400 hover:shadow-lg hover:shadow-gray-500"
                  onClick={() => checkTable(table.userId)}
                >
                  Aceptar
                </button>
              )}
            </div>
          );
        })}
      </div>
      <button
        className="bg-blue-500 text-white py-1 px-5 rounded-1 font-semibold hover:bg-blue-400 hover:shadow-lg hover:shadow-gray-400"
        onClick={postTable}
      >
        Crear Mesa
      </button>
    </section>
  );
};

export default TablesGame;
