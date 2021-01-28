import { changedonorprofile } from './ActionTypes';

const changeDonorProfile = (donorProfile) => {
    return (dispatch)=>{
        dispatch({type: changedonorprofile, donorProfile:donorProfile})
    }
}

export default changeDonorProfile;