import immutable from "../../../helpers/immutable-object";

const initialUsers = {
    loading: false,
    error: '',
    list: [],
};

function usersReducer(oldState, action) {
    const state = immutable(oldState);
    switch (action.type) {
        case 'GET_USERS_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'GET_USERS_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
                list: action.payload,
            };
        case 'GET_USERS_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'POST_USERS_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'POST_USERS_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                list: action.payload,
                error: '',
            };
        case 'POST_USERS_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'DELETE_USERS_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'DELETE_USERS_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
                list: action.payload,
            };
        case 'DELETE_USERS_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };

        default:
            return state;
    }
}

export {usersReducer, initialUsers};
