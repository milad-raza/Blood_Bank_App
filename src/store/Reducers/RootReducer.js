import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import BloodDonateReducer from "./BloodDonateReducer";

const Reducers = combineReducers({
    Login: LoginReducer,
    BloodDonate: BloodDonateReducer,
})

export default Reducers;