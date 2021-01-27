import { changegender } from '../Actions/ActionTypes';

const initialState = {
    gender : null
}

const GenderReducer = (state = initialState, action) => {
    switch(action.type){
        case changegender: 
            return ({
                ...state,
                gender: action.gender
            })
        default :
            return state
    }

}

export default GenderReducer;