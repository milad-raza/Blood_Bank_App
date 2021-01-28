import { changedonorprofile } from '../Actions/ActionTypes';

const initialState = {
    donorProfile : {}
}

const DonorProfileReducer = (state = initialState, action) => {
    switch(action.type){
        case changedonorprofile: 
            return ({
                ...state,
                donorProfile: action.donorProfile
            })
        default :
            return state
    }

}

export default DonorProfileReducer;