import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResultsSearch = ({ resSearch }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!resSearch.length) navigate("/");
  }, []);

  return (
    <div className="w-full min-h-screen bg-purple-300 flex justify-center items-center p-3 flex-wrap gap-5 ">
      {resSearch.map((res, index) => {
        return (
          <div
            key={res._id}
            className="w-96 min-h-96 flex justify-center items-center flex-col gap-3 font-semibol text-white py-3 rounded-2 bg-purple-400 hover:border-2 hover:border-purple-500 hover:shadow-md hover:shadow-purple-200"
          >
            <img
              src={res?.picture}
              alt="image-profile"
              className="w-52 h-52 rounded-full"
            />
            <h2 className="text-2xl">UserName: {res.userName}</h2>
            <p>Score: {res.points}</p>
            <p>Country: {res.country}</p>
            <p>Birthday: {res.birthday}</p>
            <button
              className="bg-indigo-600 py-1 px-2 rounded-1 text-white font-semibold hover:bg-indigo-500"
              onClick={() => navigate(`/user/profile/${res.userId}`)}
            >
              Ver Perfil
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsSearch;
