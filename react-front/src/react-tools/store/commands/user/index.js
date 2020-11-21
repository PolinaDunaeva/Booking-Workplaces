import request from "../utils/request";

const checkUser = async (dispatch, type, enqueueSnackbar ) => {
	try {
		dispatch({type: type.start});
		const {data} = await request('GET', '/user');
		dispatch({type: type.success, payload: data});
	} catch (e) {
		localStorage.removeItem("key");
		document.location.reload();
		enqueueSnackbar('проверьте поля', {variant: 'error'});
		dispatch({type: type.error});
	}
};

const checkLogin = async (enqueueSnackbar, body) => {
	try {
		const {data} = await request('POST', '/auth', body);
		localStorage.setItem("key", data.jwtToken);
		document.location.reload();
	} catch (e) {
		enqueueSnackbar('User not found', {variant: 'error'});
	}
};

export {checkUser, checkLogin};
