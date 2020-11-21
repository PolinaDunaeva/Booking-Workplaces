import immutable from "../../../helpers/immutable-object";

const initialOffice = {
    loading: false,
    error: '',
    id: '',
    name: '',
    country: '',
    city:'',
    floor: 0,
    floors: [],
    map: {
        desks: [],
    },
    bookings: null,
    height: 10,
    width: 10,
};

function officeReducer(oldState, action) {
    const state = immutable(oldState);
    switch (action.type) {
        case 'GET_OFFICE_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'GET_OFFICE_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
                id: action.payload.id,
                name: action.payload.name,
                country: action.payload.country,
                city: action.payload.city,
                floor: action.payload.floor,
                floors: !!action.payload.floors ? [...action.payload.floors].sort((a, b) => a - b) : [],
                map: action.payload.map || state.map,
                bookings: action.payload.bookings,
                height: action.payload.height,
                width: action.payload.width,
            };
        case 'GET_OFFICE_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'POST_OFFICE_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'POST_OFFICE_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                id: action.payload,
                error: '',
            };
        case 'POST_OFFICE_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'DELETE_OFFICE_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'DELETE_OFFICE_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
                id: '',
            };
        case 'DELETE_OFFICE_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'SET_OFFICE_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
                id: action.payload,
            };
        case 'RESET_OFFICE_DATA_SUCCESS':
            return {
                ...immutable(initialOffice),
            };

        default:
            return state;
    }
}

export {officeReducer, initialOffice};
