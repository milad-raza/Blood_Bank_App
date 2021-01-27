import { changefirebase } from '../Actions/ActionTypes';

const initialState = {
    firebase : []
}

const FirebaseReducer = (state = initialState, action) => {
    switch(action.type){
        case changefirebase: 
            return ({
                ...state,
                firebase: action.firebase
            })
        default :
            return state
    }

}

export default FirebaseReducer;