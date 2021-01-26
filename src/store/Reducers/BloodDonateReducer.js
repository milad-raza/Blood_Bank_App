import { changeblooddonate } from '../Actions/ActionTypes';

const initialState = {
    bloodDonate : null
}

const BloodDonateReducer = (state = initialState, action) => {
    switch(action.type){
        case changeblooddonate: 
            return ({
                ...state,
                bloodDonate: action.bloodDonate
            })
        default :
            return state
    }

}

export default BloodDonateReducer;