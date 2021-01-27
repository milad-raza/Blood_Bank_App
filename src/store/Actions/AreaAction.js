import { changearea } from './ActionTypes';

const changeArea = (area) => {
    return (dispatch)=>{
        dispatch({type: changearea, area:area})
    }
}

export default changeArea;