import immutable from "../../../helpers/immutable-object";

const initialOffices = {
    loading: false,
    error: '',
    list: [],
};

function officesReducer(oldState, action) {
    const state = immutable(oldState);
    switch (action.type) {
        case 'GET_OFFICES_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'GET_OFFICES_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
                list: action.payload,
            };
        case 'GET_OFFICES_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };

        default:
            return state;
    }
}

export {officesReducer, initialOffices};
