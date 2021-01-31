import { changedonated } from './ActionTypes';

const changeDonated = (donated) => {
    return (dispatch)=>{
        dispatch({type: changedonated, donated:donated})
    }
}

export default changeDonated;