import { changeage } from '../Actions/ActionTypes';

const initialState = {
    age : null
}

const AgeReducer = (state = initialState, action) => {
    switch(action.type){
        case changeage: 
            return ({
                ...state,
                age: action.age
            })
        default :
            return state
    }

}

export default AgeReducer;