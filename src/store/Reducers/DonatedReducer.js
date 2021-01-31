import { changedonated } from '../Actions/ActionTypes';

const initialState = {
    donated : null
}

const DonatedReducer = (state = initialState, action) => {
    switch(action.type){
        case changedonated: 
            return ({
                ...state,
                donated: action.donated
            })
        default :
            return state
    }

}

export default DonatedReducer;