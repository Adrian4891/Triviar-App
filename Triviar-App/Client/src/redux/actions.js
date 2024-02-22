import { 
    GAME_PLAY_FRIEND, 
    GET_NOTIFICATION_GAME, 
    POST_NOTIFICATION_GAME,
    DELETE_NOTIFICATION_GAME,
    CREATE_GAME,
    ACT_GAME,
    ADD_PROFILE,
    DEL_PROFILE,
    SUM_POINTS,
    ACT_DATA_PLAYERS,
    CREATE_DATA_GAME,
    SUM_QUATITY_RES,
    ACT_DATA_GAME,
    RESET_DATA_GAME,
} from "./actionTypes";
import axios from "axios";
import { URL_BASE } from "../utils";

export const AddFriendGame = (user, friend) => {
    return {
        type: GAME_PLAY_FRIEND,
        payload: [user, friend]
    };
}

export const sumPointsPlayer = (id) => {
    try {
        return async (dispatch)=>{
            const { data } = await axios.put(`${URL_BASE}/profile/points/${id}`);
            return (dispatch({
                type:SUM_POINTS,
                payload: data
            }));
        }
    } catch (error) {
        console.log(error);
    }
}

export const getNotiGame = () => {
    try {
        return async (dispatch) => {
            const { data } = await axios(`${URL_BASE}/notificationsGame`);
            return( dispatch({
              type: GET_NOTIFICATION_GAME,
              payload: data
            }))
        }
    } catch (error) {
        console.log(error);
    }
}

export const postNotiGames = (id, friend) => {
    try {
        return async (dispatch) =>{
           const { data } = await axios.post(`${URL_BASE}/notificationsGame/${id}`,friend);
           console.log(data)
           return (dispatch({
              type: POST_NOTIFICATION_GAME,
              payload: data
           }));
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteNotiGame = (notifications) => {
    return {
        type: DELETE_NOTIFICATION_GAME,
        payload: notifications
    }

}


export const createGame = (noti) => {
    try {
        return async (dispatch)=>{
           const { data } = await axios.post(`${URL_BASE}/game`, noti);
           return(dispatch({
               type:CREATE_GAME,
                payload: data
            }));
        }

    } catch (error) {
       console.log(error);
    }
}

export const actGame = (player1, player2) => {
    try {
        return async (dispatch)=>{
            const { data } = await axios(`${URL_BASE}/game/act?player1=${player1}&player2=${player2}`);
            return(dispatch({
                type:ACT_GAME,
                payload: data
            }));
        }

    } catch (error) {
       console.log(error);
    }
}

export const getProfile = (userId) => {
    try {
        return async (dispatch)=>{
            const { data } = await axios(`${URL_BASE}/profile/${userId}`);
            if(!data[0].userName) throw Error("No tiene un perfil");
            return dispatch({
                type: ADD_PROFILE,
                payload: data[0]
            });
        }
    } catch (error) {
        console.log(error);
    }
}


export const delDataProfile = () => {
    return {
        type: DEL_PROFILE,
        payload: {}
    }
}


export const actualizarData = (players) => {
        
    return({
        type:ACT_DATA_PLAYERS,
        payload:players
    }) 
}


export const createDataGame = (info) => {
    try {
        return async (dispatch)=>{
            const { data } = await axios.post(`${URL_BASE}/game/infoGame`,info)

            return(dispatch({
                type:CREATE_DATA_GAME,
               payload:data
            }));
        }
    } catch (error) {
        console.log(error);
    }
}

export const sumQuantityRes = (data) => {
    return({
        type: SUM_QUATITY_RES,
        payload:data
    });
   
}

export const actDataGame = (info) => {
    return({
        type: ACT_DATA_GAME,
        payload: info
    });
}

export const resetDataGame = (data) => {
    return({
        type: RESET_DATA_GAME,
        payload:data
    });
}