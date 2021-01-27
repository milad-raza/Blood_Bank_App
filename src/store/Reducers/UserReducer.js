import { changeuser } from '../Actions/ActionTypes';

const initialState = {
    user: null,
}

const UserReducer = (state = initialState, action) => {
    switch(action.type){
        case changeuser: 
            return ({
                ...state,
                user: action.user
            })
        default :
            return state
    }

}

export default UserReducer;