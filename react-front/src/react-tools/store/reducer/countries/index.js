import immutable from "../../../helpers/immutable-object";

const initialCountries = {
    loading: false,
    error: '',
    list: [],
};

function countriesReducer(oldState, action) {
    const state = immutable(oldState);
    switch (action.type) {
        case 'GET_COUNTRIES_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'GET_COUNTRIES_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
                list: action.payload,
            };
        case 'GET_COUNTRIES_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'POST_COUNTRY_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'POST_COUNTRY_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'POST_COUNTRY_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };
        default:
            return state;
    }
}

export {countriesReducer, initialCountries};
