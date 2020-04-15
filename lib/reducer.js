import { DELETE_ITEM, PRINT_ITEM, TOGGLE_CHECK } from './actions';

const initialState = {
    deviceType: '',
    deviceStatus: '',
    deviceRegistered: null,
    isValidUser: null,
    oggedInUser: null,
};

export default function reducer(state = initialState, action) {
    const newState = { ...state };

    if (typeof state === 'undefined') {
        return state;
    }


    if (action.type === 'SET_DEVICE_TYPE') {
        newState.deviceType = action.args.deviceType;
    }

    if (action.type === 'SET_USER_INFO') {
        newState.loggedInUser = action.args.user;
    }

    if (action.type === 'SET_VALID_USER') {
        newState.isValidUser = action.args.valid;
    }

    if (action.type === 'SET_REGISTRATION_STATUS') {
        newState.deviceRegistered = action.args.deviceRegistered;
    }

    if (action.type === 'SET_DEVICE_STATUS') {
        newState.deviceStatus = action.args.status;
    }

    return newState;
}