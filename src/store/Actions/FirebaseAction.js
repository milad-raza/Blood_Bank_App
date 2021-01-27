import { changefirebase } from './ActionTypes';

const changeFirebase = (firebase) => {
    return (dispatch)=>{
        dispatch({type: changefirebase, firebase:firebase})
    }
}

export default changeFirebase;