import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import UserReducer from './UserReducer';
import BloodDonateReducer from "./BloodDonateReducer";
import GenderReducer from "./GenderReducer";
import AgeReducer from "./AgeReducer";
import AreaReducer from "./AreaReducer";
import FirebaseReducer from './FirebaseReducer';
import AllDonorsReducer from './AllDonorsReducer';
import DonorProfileReducer from './DonorProfileReducer';
import RecipientReducer from './RecipientReducer';
import RandomImageReducer from './RandomImageReducer';
import DonatedReducer from './DonatedReducer'

const Reducers = combineReducers({
    Login: LoginReducer,
    User: UserReducer,
    BloodDonate: BloodDonateReducer,
    Gender: GenderReducer,
    Age: AgeReducer,
    Area: AreaReducer,
    Firebase: FirebaseReducer,
    AllDonors: AllDonorsReducer,
    DonorProfile: DonorProfileReducer,
    Recipient: RecipientReducer,
    RandomImage: RandomImageReducer,
    Donated: DonatedReducer,
})

export default Reducers;