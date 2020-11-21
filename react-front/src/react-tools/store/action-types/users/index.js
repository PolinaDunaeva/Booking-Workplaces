const actionTypes = {
    get: {
        base: 'GET_USERS_DATA',
        start: 'GET_USERS_DATA_START',
        success: 'GET_USERS_DATA_SUCCESS',
        error: 'GET_USERS_DATA_ERROR'
    },
    addUserRole:{
        base: 'POST_USERS_DATA',
        start: 'POST_USERS_DATA_START',
        success: 'POST_USERS_DATA_SUCCESS',
        error: 'POST_USERS_DATA_ERROR'
    },
    deleteUserRole:{
        base: 'DELETE_USERS_DATA',
        start: 'DELETE_USERS_DATA_START',
        success: 'DELETE_USERS_DATA_SUCCESS',
        error: 'DELETE_USERS_DATA_ERROR'
    },

};

export default actionTypes;