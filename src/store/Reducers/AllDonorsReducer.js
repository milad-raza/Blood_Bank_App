import { changealldonors } from '../Actions/ActionTypes';

const initialState = {
    allDonors : []
}

const AllDonorsReducer = (state = initialState, action) => {
    switch(action.type){
        case changealldonors: 
            return ({
                ...state,
                allDonors: action.allDonors
            })
        default :
            return state
    }

}

export default AllDonorsReducer;