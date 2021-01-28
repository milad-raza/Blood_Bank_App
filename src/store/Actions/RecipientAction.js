import { changerecipient } from './ActionTypes';

const changeRecipient = (recipient) => {
    return (dispatch)=>{
        dispatch({type: changerecipient, recipient:recipient})
    }
}

export default changeRecipient;