import { changerandomimage } from '../Actions/ActionTypes';

const initialState = {
    randomImage : ""
}

const RandomImageReducer = (state = initialState, action) => {
    switch(action.type){
        case changerandomimage: 
            return ({
                ...state,
                randomImage: action.randomImage
            })
        default :
            return state
    }

}

export default RandomImageReducer;