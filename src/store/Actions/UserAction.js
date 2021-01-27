import { changeuser } from './ActionTypes';

const changeUser = (user) => {
    return (dispatch)=>{
        dispatch({type: changeuser, user:user})
    }
}

export default changeUser;