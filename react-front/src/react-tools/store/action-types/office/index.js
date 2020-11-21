const actionTypes = {
    get: {
        base: 'GET_OFFICE_DATA',
        start: 'GET_OFFICE_DATA_START',
        success: 'GET_OFFICE_DATA_SUCCESS',
        error: 'GET_OFFICE_DATA_ERROR'
    },
    put: {
        base: 'PUT_OFFICE_DATA',
        start: 'PUT_OFFICE_DATA_START',
        success: 'PUT_OFFICE_DATA_SUCCESS',
        error: 'PUT_OFFICE_DATA_ERROR'
    },
    post: {
        base: 'POST_OFFICE_DATA',
        start: 'POST_OFFICE_DATA_START',
        success: 'POST_OFFICE_DATA_SUCCESS',
        error: 'POST_OFFICE_DATA_ERROR'
    },
    delete: {
        base: 'DELETE_OFFICE_DATA',
        start: 'DELETE_OFFICE_DATA_START',
        success: 'DELETE_OFFICE_DATA_SUCCESS',
        error: 'DELETE_OFFICE_DATA_ERROR'
    },
    reset: {
        base: 'RESET_OFFICE_DATA',
        start: 'RESET_OFFICE_DATA_START',
        success: 'RESET_OFFICE_DATA_SUCCESS',
        error: 'RESET_OFFICE_DATA_ERROR'
    },
    set: {
        base: 'SET_OFFICE_DATA',
        start: 'SET_OFFICE_DATA_START',
        success: 'SET_OFFICE_DATA_SUCCESS',
        error: 'SET_OFFICE_DATA_ERROR'
    },
};

export default actionTypes;
