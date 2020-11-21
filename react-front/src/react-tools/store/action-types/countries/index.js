const actionTypes = {
    get: {
        base: 'GET_COUNTRIES_DATA',
        start: 'GET_COUNTRIES_DATA_START',
        success: 'GET_COUNTRIES_DATA_SUCCESS',
        error: 'GET_COUNTRIES_DATA_ERROR'
    },
    post: {
        base: 'POST_COUNTRY_DATA',
        start: 'POST_COUNTRY_DATA_START',
        success: 'POST_COUNTRY_DATA_SUCCESS',
        error: 'POST_COUNTRY_DATA_ERROR'
    },
    delete: {
        base: 'DELETE_COUNTRY_DATA',
        start: 'DELETE_COUNTRY_DATA_START',
        success: 'DELETE_COUNTRY_DATA_SUCCESS',
        error: 'DELETE_COUNTRY_DATA_ERROR'
    },
};

export default actionTypes;
