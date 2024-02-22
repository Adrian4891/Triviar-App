import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { URL_BASE } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { resetDataGame } from "../../redux/actions";
import Swal from "sweetalert2";

const socket = io(`${URL_BASE}`);

const QuestionAndOptions = ({
  index,
  answers,
  handleWinPoints,
  getAnswers,
  infoGame,
  checked,
  setInfoGame,
  setIndex,
  setLoad,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  const name = profile.userName;
  const [activeInp, setActiveInp] = useState(true);
  const players = useSelector((state) => state.players);

  const newGame = () => {
    const data = infoGame.map((info) => {
      info.quantityRes = 0;
      info.game += 1;
      return info;
    });
    if (data.length > 1) {
      return dispatch(resetDataGame(data));
    } else {
      console.log(data);
      setInfoGame(data);
    }
  };

  window.addEventListener("popstate", function (event) {
    socket.emit("profile", profile);
  });

  window.addEventListener("beforeunload", function (event) {
    const message = "¿Estas seguro que deseas salir?";
    event.returnValue = message;
    socket.emit("profile", profile);
    return message;
  });

  useEffect(() => {
    const endGame = (profile) => {
      if (profile) {
        Swal.fire({
          text: `${profile?.userName} Salio del juego`,
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok Volver!",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    };
    socket.on("profile", endGame);
    return () => {
      socket.off("profile", endGame);
    };
  }, [profile]);

  useEffect(() => {
    const playNewGame = (name) => {
      Swal.fire({
        text: `${name}, te invito a seguir jugando`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si Jugar",
      }).then((result) => {
        if (result.isConfirmed) {
          setIndex(0);
          newGame();
          socket.emit("activeInp", activeInp);
        } else {
          navigate("/");
          socket.emit("profile", profile);
        }
      });
    };
    socket.on("name", playNewGame);
    return () => {
      socket.off("name", playNewGame);
    };
  }, [profile]);

  useEffect(() => {
    const activeInput = (activeInp) => {
      if (activeInp) setActiveInp(true);
    };
    socket.on("activeInp", activeInput);
    return () => {
      socket.off("activeInp", activeInput);
    };
  }, [activeInp]);

  return (
    <div className="d-flex items-center justify-start flex-col h-3/5 md:gap-5 w-full p-3 md:p-3 font-bold text-white bg-dark">
      {index < 10 ? (
        <>
          <p className="mb-3 text-center border-1 p-2 rounded-2 inline border-blue-500 text-md md:text-xl">
            {decodeEntities(answers[index]?.question)}
          </p>
          {answers[index]?.type === "multiple" ? (
            <div className="grid grid-cols-1 md:gap-3 md:grid-cols-2 ">
              <fieldset
                className={`px-3 py-1 rounded mb-2 sm:mb-0 mr-1 w-72 lg:w-96 cursor-pointer ${
                  checked === false && "bg-purple-700"
                }
                            ${
                              answers[index]?.options[0] ===
                                answers[index]?.correct_answer &&
                              checked &&
                              "bg-green-500"
                            } 
                            ${
                              answers[index]?.options[0] !==
                                answers[index]?.correct_answer &&
                              checked &&
                              "bg-red-500"
                            }`}
                onClick={() =>
                  activeInp && handleWinPoints(answers[index]?.options[0])
                }
              >
                <label htmlFor="" className="text-white">
                  A
                </label>
                <input
                  type="button"
                  value={decodeEntities(answers[index]?.options[0])}
                  className="text-[calc(1rem-7px)] lg:text-sm px-3 sm:py-1"
                />
              </fieldset>
              <fieldset
                className={`px-3 py-1 rounded mb-2 sm:mb-0 mr-1 w-72 lg:w-96 cursor-pointer ${
                  checked === false && "bg-fuchsia-600"
                }
                            ${
                              answers[index]?.options[1] ===
                                answers[index]?.correct_answer &&
                              checked &&
                              "bg-green-500"
                            } 
                            ${
                              answers[index]?.options[1] !==
                                answers[index]?.correct_answer &&
                              checked &&
                              "bg-red-500"
                            }`}
                onClick={() =>
                  activeInp && handleWinPoints(answers[index]?.options[1])
                }
              >
                <label htmlFor="" className="text-white">
                  B
                </label>
                <input
                  type="button"
                  value={decodeEntities(answers[index]?.options[1])}
                  className="text-[calc(1rem-7px)] lg:text-sm px-3 sm:py-1"
                />
              </fieldset>
              <fieldset
                className={`px-3 py-1 rounded mb-2 sm:mb-0 mr-1 w-72 lg:w-96 cursor-pointer ${
                  checked === false && "bg-indigo-600"
                }
                            ${
                              answers[index]?.options[2] ===
                                answers[index]?.correct_answer &&
                              checked &&
                              "bg-green-500"
                            }  
                            ${
                              answers[index]?.options[2] !==
                                answers[index]?.correct_answer &&
                              checked &&
                              "bg-red-500"
                            } `}
                onClick={() =>
                  activeInp && handleWinPoints(answers[index]?.options[2])
                }
              >
                <label htmlFor="" className="text-white">
                  C
                </label>
                <input
                  type="button"
                  value={decodeEntities(answers[index]?.options[2])}
                  className="text-[calc(1rem-7px)] lg:text-sm px-3 sm:py-1 "
                />
              </fieldset>
              <fieldset
                className={`px-3 py-1 rounded mb-2 mr-1 w-72 lg:w-96 cursor-pointer ${
                  checked === false && "bg-yellow-500"
                }                    
                            ${
                              answers[index]?.options[3] ===
                                answers[index]?.correct_answer &&
                              checked &&
                              "bg-green-500"
                            } 
                            ${
                              answers[index]?.options[3] !==
                                answers[index]?.correct_answer &&
                              checked &&
                              "bg-red-500"
                            } `}
                onClick={() =>
                  activeInp && handleWinPoints(answers[index]?.options[3])
                }
              >
                <label htmlFor="" className="text-white ">
                  D
                </label>
                <input
                  type="button"
                  value={decodeEntities(answers[index]?.options[3])}
                  className="text-[calc(1rem-7px)] lg:text-sm px-3 sm:py-1"
                />
              </fieldset>
            </div>
          ) : (
            <div>
              <fieldset
                className={`px-3 py-1 rounded mb-2 w-72 lg:w-96 cursor-pointer ${
                  checked === false && "bg-cyan-600"
                }
                            ${
                              "True" === answers[index]?.correct_answer &&
                              checked &&
                              "bg-green-500"
                            } 
                            ${
                              "True" !== answers[index]?.correct_answer &&
                              checked &&
                              "bg-red-500"
                            }`}
                onClick={() => handleWinPoints("True")}
              >
                <label htmlFor="" className="text-white ">
                  A
                </label>
                <input
                  type="button"
                  value="True"
                  className="text-[calc(1rem-7px)] lg:text-sm px-3 py-1  ml-2"
                />
              </fieldset>
              <fieldset
                className={`px-3 py-1  rounded mb-2 w-72 lg:w-96 cursor-pointer ${
                  checked === false && "bg-cyan-600"
                }
                            ${
                              "False" === answers[index]?.correct_answer &&
                              checked &&
                              "bg-green-500"
                            } 
                            ${
                              "False" !== answers[index]?.correct_answer &&
                              checked &&
                              "bg-red-500"
                            } `}
                onClick={() => handleWinPoints("False")}
              >
                <label htmlFor="" className="text-white ">
                  B
                </label>
                <input
                  type="button"
                  value="False"
                  className="text-[calc(1rem-7px)] lg:text-sm px-3 py-1  ml-2"
                />
              </fieldset>
            </div>
          )}
          {!activeInp && (
            <p className="text-white">
              {players.length > 1 && `Esperado al otro jugador...`}
            </p>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:gap-5 text-center p-2 w-full content-center justify-items-center	">
          <p className="font-bold text-xl pt-2   text-white">
            Quieres seguir jugando?
          </p>
          <div className="grid grid-cols-2  content-center justify-items-center">
            <input
              type="button"
              value={"Si"}
              className="font-bold text-white text-center border-1 m-2 border-green-500 rounded-1 text-lg hover:bg-green-500 w-32 sm:w-60"
              onClick={() =>
                players.length > 1
                  ? getAnswers(
                      newGame(),
                      socket.emit("name", name),
                      setActiveInp(false)
                    )
                  : getAnswers(setActiveInp(true))
              }
            />
            <input
              type="button"
              value={"No"}
              className="font-bold text-white text-center border-1 m-2 border-red-500 rounded-1 text-lg hover:bg-red-500 w-32 sm:w-60"
              onClick={() => navigate("/", socket.emit("profile", profile))}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function decodeEntities(encodedString) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = encodedString;
  return textArea.value;
}
export default QuestionAndOptions;
