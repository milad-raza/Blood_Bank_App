import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import UserReducer from './UserReducer';
import BloodDonateReducer from "./BloodDonateReducer";
import GenderReducer from "./GenderReducer";
import AgeReducer from "./AgeReducer";
import AreaReducer from "./AreaReducer";

const Reducers = combineReducers({
    Login: LoginReducer,
    User: UserReducer,
    BloodDonate: BloodDonateReducer,
    Gender: GenderReducer,
    Age: AgeReducer,
    Area: AreaReducer,

})

export default Reducers;