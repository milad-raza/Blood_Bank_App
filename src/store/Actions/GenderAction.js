import { changegender } from './ActionTypes';

const changeGender = (gender) => {
    return (dispatch)=>{
        dispatch({type: changegender, gender:gender})
    }
}

export default changeGender;