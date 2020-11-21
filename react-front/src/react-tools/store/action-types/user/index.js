const actionTypes = {
    checkUser: {
        base: 'GET_USER_DATA',
        start: 'GET_USER_DATA_START',
        success: 'GET_USER_DATA_SUCCESS',
        error: 'GET_USER_DATA_ERROR'
    },
    signIn: {
        base: 'POST_USER_DATA',
        start: 'POST_USER_DATA_START',
        success: 'POST_USER_DATA_SUCCESS',
        error: 'POST_USER_DATA_ERROR'
    }
};

export default actionTypes;

