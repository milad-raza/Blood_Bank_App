import { changeage } from './ActionTypes';

const changeAge = (age) => {
    return (dispatch)=>{
        dispatch({type: changeage, age:age})
    }
}

export default changeAge;