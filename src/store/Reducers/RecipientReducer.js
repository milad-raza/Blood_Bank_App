import { changerecipient } from '../Actions/ActionTypes';

const initialState = {
    recipient : null
}

const RecipientReducer = (state = initialState, action) => {
    switch(action.type){
        case changerecipient: 
            return ({
                ...state,
                recipient: action.recipient
            })
        default :
            return state
    }

}

export default RecipientReducer;