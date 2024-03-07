import { useState, useEffect } from "react";
import { URL_BASE } from "../../utils";
import axios from "axios";
import ChatInPlay from "../../components/chatInPlay/ChatInPlay";
import QuestionAndOptions from "../../components/questionAndOptions/QuestionAndOptions";
import TableFinalGame from "../../components/tableFinalGame/TableFinalGame";
import HeaderGame from "../../components/headerGame/HeaderGame";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { sumPointsPlayer, actGame, actualizarData, createDataGame, sumQuantityRes, actDataGame, resetDataGame } from "../../redux/actions";
import io from "socket.io-client";
import Spinner from "../../components/spinner/Spinner";

const socket = io('http://localhost:3001');

const MultiPlay = ({load, setLoad}) => {
  const [ open, setOpen ] = useState(false);
  const [ inpValue, setInpValue ] = useState("");
  const [ arrMsg, setArrMsg ] = useState([]);
  const [ answers, setAnswers ] = useState([]);
  const [ index, setIndex ] = useState(0);
  const userId = Cookies.get("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const players = useSelector(state=> state.players);
  const profile = useSelector(state=> state.profile);
  const [ checked, setChecked ] = useState(false);
  const playerOut = profile.userName;

  const infoGame = useSelector(state=> state.infoGame);
  
  const getAnswers = async () =>{
    try {
      const { data } = await axios(`${URL_BASE}/answers`)
      setIndex(0)
      setAnswers(data);
      const questions = data;
      socket.emit("questions", questions);
      
    } catch (error) {
      console.log(error);
    }
  };
    
  //////////////////////////chat///////////////
    
  const handleInput = (event) => {
    setInpValue(event.target.value);
  }
  
  const handleSumbmit = (event) => {
    event.preventDefault();
    if(inpValue !== ""){
      const msg = {
        userName:profile.userName, //.profile
        message:inpValue
      }
      socket.emit("msg", msg)
      setArrMsg([msg, ...arrMsg])
      setInpValue("");
    }
  }
  /////////////////////////////////////////////////////////////juego

  const handleWinPoints = (resUser) => {
    setChecked(true);
    if(answers[index]?.correct_answer === resUser) {
        const quantity = {
          quantityRes:1,
          userId
        };
        dispatch(sumPointsPlayer(userId));
    
        dispatch(sumQuantityRes( quantity));
      
      }
      setTimeout(() => {
      socket.emit("players", players);
      socket.emit("infoGame", infoGame);
      setChecked(false)
      setIndex(index+1)
      socket.emit("index", index);
    }, 1000);
  }

  useEffect(()=>{
    const getQuestions =(questions)=>{
      setAnswers(questions);
    }
    socket.on("questions", getQuestions);
    return()=>{
      socket.off("questions", getQuestions);
    }
  },[answers]);

  useEffect(()=>{
    getAnswers();
    setLoad(true)
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  },[]);
   
  useEffect(()=>{
    const receiveMessage = (msg) =>{
      setArrMsg([msg, ...arrMsg]);
    }
    socket.on("msg", receiveMessage);
    
    return()=>{
      socket.off("msg", receiveMessage);
    }
  },[arrMsg]);
      
  useEffect(()=>{
    const receivePlayers = (players) => {
      dispatch(actualizarData(players));
    }
    socket.on("players", receivePlayers);
    return () => {
      socket.off("players", receivePlayers);
    }
  },[players]);


  useEffect(()=>{
      const modifiedIndex = (index) => {
        setIndex(index+1);
      }
      socket.on("index", modifiedIndex);
      
      return()=>{
        socket.off("index", modifiedIndex);
      }
  },[index]);

  useEffect(()=>{ 
    const modifiedData = (infoGame) => {
      dispatch(actDataGame(infoGame)); 
    }
    socket.on("infoGame", modifiedData);
    return()=>{
      socket.off("infoGame", modifiedData);
    }
    
  },[infoGame]);

  if(load){
    return(
      <Spinner/>
    );
  }
 
  return(
    <div className="d-flex items-center justify-center h-screen sm:min-h-screen flex-col bg-dark relative">
      <HeaderGame 
      index={index}
      answers={answers}
      img={profile.picture}
      />

      {index > 9 && 
      <TableFinalGame 
      players={players} 
      infoGame={infoGame}
      />
      }

      <QuestionAndOptions
      index={index}
      answers={answers}
      handleWinPoints={handleWinPoints}
      getAnswers={getAnswers}
      infoGame={infoGame}
      checked={checked}
      setIndex={setIndex}
      setLoad={setLoad}
      />
            
      <ChatInPlay
      open={open} 
      setOpen={setOpen} 
      arrMsg={arrMsg} 
      handleSumbmit={handleSumbmit} 
      handleInput={handleInput}
      inpValue={inpValue}
      />
    </div>             
  );
}

export default MultiPlay;