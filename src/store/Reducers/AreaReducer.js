import { changearea } from '../Actions/ActionTypes';

const initialState = {
    area : null
}

const AreaReducer = (state = initialState, action) => {
    switch(action.type){
        case changearea: 
            return ({
                ...state,
                area: action.area
            })
        default :
            return state
    }

}

export default AreaReducer;