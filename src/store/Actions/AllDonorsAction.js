import { changealldonors } from './ActionTypes';

const changeALLDonors = (allDonors) => {
    return (dispatch)=>{
        dispatch({type: changealldonors, allDonors:allDonors})
    }
}

export default changeALLDonors;