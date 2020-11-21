import {checkUser} from "../../commands/user/index.js";

function dispatchUserMiddleware(dispatch) {
	return (action) => {
		switch (action.type.base) {
			case 'GET_USER_DATA':
				checkUser(dispatch, action.type, action.enqueueSnackbar);
				break;
			default:
				return dispatch(action);
		}
	};
}

export {dispatchUserMiddleware};
