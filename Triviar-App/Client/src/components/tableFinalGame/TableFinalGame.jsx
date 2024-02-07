import { useEffect, useState } from "react";


const TableFinalGame = ({players, infoGame}) => {

    const [ winner, setWinner ] = useState({});

    const handleWinGame = () => {

        if(infoGame[0].quantityRes === infoGame[1].quantityRes) return setWinner({});
        const userWinn = infoGame.reduce((previous, current)=>{
            return current.quantityRes > previous.quantityRes ? current  : previous;
        });
        setWinner(userWinn); 
    };

    useEffect(()=>{
        if(players.length > 1){
            handleWinGame();
        }
    },[]);

    return(
        <div className="d-flex items-center text-white font-bold bg-dark w-full justify-center flex-col">
          {  players.length > 1 &&
            <p>{ winner.userName ? winner.userName + " Ah ganado el juego"  : "han empatado el juego" }</p>
            
          }
          <div className="d-flex  flex-col sm:flex-row mt-2 gap-2 "> 
            {
            infoGame.map((info, index)=>{
                
                return(
                    <>
                        <div className="w-82 text-left border-1 border-blue-400 p-2 rounded-1">
                            <p className="">{info.userName}</p>
                            <p className="">Points: {players[index].points}</p>
                            <p className="">Responses: {info.quantityRes} de 10</p>
                        </div>
                    </>
                )
            })
           }
           </div>

        </div>
    );
}

export default TableFinalGame;