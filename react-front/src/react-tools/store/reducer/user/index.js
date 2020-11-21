import immutable from "../../../helpers/immutable-object";

const initialUser = {
    id: '',
    fullName: '',
    image: '',
    email: '',
    loading: false,
    role: 'noAccess',
    users: [],
    error: ''
};

function userReducer(oldState, action) {
    const state = immutable(oldState);
    switch (action.type) {
        case 'GET_USER_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'GET_USER_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                fullName: action.payload.data,
                email: action.payload.email,
                firstName: action.payload.firstname,
                lastName: action.payload.lastname,
                role: action.payload.roles[0],
                error: '',
            };
        case 'GET_USER_DATA_ERROR':
            return {
                ...state,
                loading: false,
                fullName: 'нет данных о юзере',
                error: '',
            };

        default:
            return state;
    }
}

export {userReducer, initialUser};
