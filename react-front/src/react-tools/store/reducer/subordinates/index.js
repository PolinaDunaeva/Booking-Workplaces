import immutable from "../../../helpers/immutable-object";

const initialHrsSubordinates = {
    loading: false,
    list: [],
    error: ''
};

function hrsSubordinatesReducer(oldState, action) {
    const state = immutable(oldState);
    switch (action.type) {
        case 'GET_HR_SUBORDINATES_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'GET_HR_SUBORDINATES_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                list: action.payload,
                error: '',
            };
        case 'GET_HR_SUBORDINATES_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'DELETE_HR_SUBORDINATES_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'DELETE_HR_SUBORDINATES_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
                list: action.payload,
            };
        case 'DELETE_HR_SUBORDINATES_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };

        default:
            return state;
    }
}

export {hrsSubordinatesReducer, initialHrsSubordinates};
