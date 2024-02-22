import { useSelector } from "react-redux";

const HeaderGame = ({ answers, index }) => {
  const players = useSelector((state) => state.players);
  const infoGame = useSelector((state) => state.infoGame);

  return (
    <>
      <div className=" w-full d-flex md:justify-around gap-4 px-2 py-1 justify-around bg-blue-400 h-2/5">
        {players.map((player) => {
          return (
            <div key={player?._id} className="flex flex-col items-center">
              <h3 className=" md:text-xl text-white font-bold p-2">
                {player?.userName}
              </h3>
              <img
                src={player?.picture}
                alt=""
                className=" w-24 h-24 fit-content rounded-full"
              />
              <h2 className=" md:text-xl text-white font-bold p-2">
                {player?.points}
              </h2>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-blue-400 d-flex items-center justify-center p-1 ">
        <p className="bg-dark px-6 py-1 text-blue-300 font-bold h-8 rounded-1 m-1 w-72">
          <span className="m-2">Game: {infoGame[0]?.game} </span>
          {<span className="m-2">{`Quest: ${index} / ${answers.length}`}</span>}
        </p>
      </div>
    </>
  );
};

export default HeaderGame;
