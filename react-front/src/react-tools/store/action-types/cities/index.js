const actionTypes = {
    get: {
        base: 'GET_CITIES_DATA',
        start: 'GET_CITIES_DATA_START',
        success: 'GET_CITIES_DATA_SUCCESS',
        error: 'GET_CITIES_DATA_ERROR'
    },
    post: {
        base: 'POST_CITY_DATA',
        start: 'POST_CITY_DATA_START',
        success: 'POST_CITY_DATA_SUCCESS',
        error: 'POST_CITY_DATA_ERROR'
    },
    delete: {
        base: 'DELETE_CITY_DATA',
        start: 'DELETE_CITY_DATA_START',
        success: 'DELETE_CITY_DATA_SUCCESS',
        error: 'DELETE_CITY_DATA_ERROR'
    },
};

export default actionTypes;
