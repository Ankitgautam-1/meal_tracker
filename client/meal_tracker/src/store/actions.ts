interface User{
    uid: String,
    email: String,
    username:String

}
export const SET_USER="SET_USER";
export const REMOVE_USER="REMOVE_USER";

const setUser=(user:User)=>{
    return{
        type: SET_USER,
        payload: user
    }
}
const removeUser=()=>{
    return{
        type:REMOVE_USER,
        payload:null

    } 
}

export default setUser;
export {removeUser};
