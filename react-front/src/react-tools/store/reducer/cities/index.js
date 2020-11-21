import immutable from "../../../helpers/immutable-object";

const initialCities = {
    loading: false,
    error: '',
    list: [],
};

function citiesReducer(oldState, action) {
    const state = immutable(oldState);
    switch (action.type) {
        case 'GET_CITIES_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'GET_CITIES_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
                list: action.payload,
            };
        case 'GET_CITIES_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'POST_CITY_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'POST_CITY_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'POST_CITY_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };
        default:
            return state;
    }
}

export {citiesReducer, initialCities};