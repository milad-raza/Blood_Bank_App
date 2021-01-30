import { changerandomimage } from './ActionTypes';

const changeRandomImage = (randomImage) => {
    return (dispatch)=>{
        dispatch({type: changerandomimage, randomImage:randomImage})
    }
}

export default changeRandomImage;