import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { URL_BASE } from "../../utils";
import QuestionAndOptions from "../questionAndOptions/QuestionAndOptions";
import Cookies from "js-cookie";
import { getProfile } from "../../redux/actions";
import TableFinalGame from "../tableFinalGame/TableFinalGame";
import Spinner from "../spinner/Spinner";

const GameSimple = ({load, setLoad}) => {
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const userId = Cookies.get("userId");
    const [ answers, setAnswers ] = useState([]);
    const [ checked, setChecked ] = useState(false);
    const [ index, setIndex ] = useState(0);
    const [ tableEnd , setTableEnd ] = useState({
        userId,
        userName:profile.userName,
        gameId: profile._id,
        quantityRes:0,
        game: 0 
    });
    const [ players, setPlayers ] = useState([]);
    const [ infoGame, setInfoGame ] = useState([]);


    const getAnswers= async () => {
        try {
            const { data } = await axios(`${URL_BASE}/answers`);
            setIndex(0);
            setAnswers(data);
            setTableEnd ({
                userId,
                userName:profile.userName,
                gameId: profile._id,
                quantityRes:0,
                game: tableEnd.game + 1
            });
        } catch (error) {
            console.log(error)
        }
    };

    const handleWinnPoints = (response) => {
        setChecked(true)
        if(answers[index].correct_answer === response){
            sumPoints();
            setTableEnd({
                ...tableEnd,
                quantityRes : tableEnd.quantityRes+1
            });
        }
        setTimeout(() => {
            setPlayers([profile]);
            setChecked(false)
            setIndex(index+1);
        }, 1000);

        
    }

    const sumPoints = async () => {
        try {
            const { data } = await axios.put(`${URL_BASE}/profile/points/${userId}`);
            if(data.userId){
                dispatch(getProfile(userId));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getAnswers();   
        setLoad(true)
        setTimeout(() => {
            setLoad(false);  
        }, 1000);
    },[]);

    useEffect(()=>{
        setInfoGame([tableEnd]);       
    },[tableEnd]);

    if(load){
        return(
            <Spinner/>
        );
    }

   return(
      <section className="w-full h-screen flex justify-center items-start flex-col">
        <div className="h-80 w-full bg-blue-400 flex justify-center items-center flex-col">
            <article className="text-center text-white font-semibold">
                <h3 className="text-2xl">
                   {profile.userName}
                </h3>
                <img 
                src={profile.picture} 
                alt="img-profile"
                className="  w-32 h-32 rounded-full my-3"
                />
                <h4 className="text-xl">
                  Points: {profile.points}
                </h4>
            </article>
            <div className="bg-black w-72 h-8 flex justify-center items-center gap-4 text-blue-300 my-1 rounded-2 font-bold ">
                <span>game: {infoGame[0]?.game} </span>
                <span>quest: {index} / 10</span>
            </div>
        </div>
        {index > 9 && <TableFinalGame players={players} infoGame={infoGame}/>}
       <QuestionAndOptions
        index={index} 
        answers={answers} 
        handleWinPoints={handleWinnPoints}
        getAnswers={getAnswers}
        infoGame={infoGame}
        checked={checked}
        setInfoGame={setInfoGame}
        />
        
      </section>
   );
}

export default GameSimple;