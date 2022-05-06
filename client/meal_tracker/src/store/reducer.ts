import { combineReducers } from "@reduxjs/toolkit";
import { REMOVE_USER, SET_USER } from "./actions";
interface Action {
    type:String,
    payload:any,
}
interface User{
    uid: String,
    email: String,
    username:String
}
 const initialstate:null|User=null;
const userReducer=(state:null|User=initialstate,action:Action)=>{
    switch (action.type) {
        case SET_USER:return state=action.payload;
        case REMOVE_USER:return state=null;
        default:return state;
    }
}


const reducer=combineReducers({userReducer:userReducer});

export default reducer;