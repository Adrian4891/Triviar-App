import { 
    GAME_PLAY_FRIEND, 
    POST_NOTIFICATION_GAME, 
    GET_NOTIFICATION_GAME, 
    DELETE_NOTIFICATION_GAME, 
    CREATE_GAME, 
    ADD_PROFILE,
    DEL_PROFILE, 
    SUM_POINTS,
    ACT_GAME,
    ACT_DATA_PLAYERS,
    CREATE_DATA_GAME,
    SUM_QUATITY_RES,
    ACT_DATA_GAME,
    RESET_DATA_GAME,
} from "./actionTypes";

const initialState = {
    players:[],
    notificationsGame:[],
    profile:{},
    infoGame:[],
}

export const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GAME_PLAY_FRIEND:
            return { ...state, players: action.payload };
        case SUM_POINTS:
            const playersResult = state.players.map(player=>{
                if(player.userId === action.payload.userId){
                    player.points = action.payload.points
                    
                }
                return player
            })
            
            return {...state, players:playersResult  }
        case POST_NOTIFICATION_GAME:
            return {...state, notificationsGame: action.payload };
        case GET_NOTIFICATION_GAME: 
           return {...state, notificationsGame:action.payload };
        case DELETE_NOTIFICATION_GAME:
            return {...state, notificationsGame: action.payload };
        case CREATE_GAME: 
            return {...state, players: action.payload };
        case ACT_GAME:
            return {...state, players: action.payload };
        case ADD_PROFILE:
            return {...state, profile: action.payload };
        case DEL_PROFILE:
            return {...state, profile: action.payload };
        case ACT_DATA_PLAYERS: 
            return {...state, players: action.payload};
        case CREATE_DATA_GAME: 
            return {...state, infoGame:action.payload};
        case SUM_QUATITY_RES:
            const dataResult = state.infoGame.map((info)=>{
                if(info.userId === action.payload.userId){
                    info.quantityRes = action.payload.quantityRes + info.quantityRes;
                }
                return info;
            });
            return {...state, infoGame: dataResult };
        case ACT_DATA_GAME: 
           return {...state, infoGame: action.payload };
        case RESET_DATA_GAME:
            return {...state, infoGame: action.payload };
        default:
           return state;
    }
}