import {getUsers,addUserRole,deleteUserRole} from "../../commands/users/index.js";

function dispatchUsersMiddleware(dispatch) {
    return (action) => {
        switch (action.type.base) {
            case 'GET_USERS_DATA':
                getUsers(dispatch, action.type, action.enqueueSnackbar, action.role);
                break;
            case 'POST_USERS_DATA':
                addUserRole(dispatch, action.type, action.enqueueSnackbar, action.email,action.role);
                break;
            case 'DELETE_USERS_DATA':
                deleteUserRole(dispatch, action.type, action.enqueueSnackbar, action.email, action.role);
                break;
            default:
                return dispatch(action);
        }
    };
}

export {dispatchUsersMiddleware};
