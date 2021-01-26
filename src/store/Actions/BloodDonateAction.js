import { changeblooddonate } from './ActionTypes';

const changeBloodDonate = (bloodDonate) => {
    return (dispatch)=>{
        dispatch({type: changeblooddonate, bloodDonate:bloodDonate})
    }
}

export default changeBloodDonate;