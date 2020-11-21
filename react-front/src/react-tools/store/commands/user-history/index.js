import request from "../utils/request";

const getUserHistory = async (dispatch, type, enqueueSnackbar,role,key) => {
    if(role === 'noAccess') {
        return;
    }
    try {
        dispatch({type: type.start});
        let url = `/${role}/bookings`;
        if(role === 'admin'){
            url += `/?email=${key}`;
        }
        const {data} = await request('GET', url);
        dispatch({type: type.success, payload: data});
    } catch (e) {
        enqueueSnackbar('Smth goes wrong', {variant: 'error'});
        dispatch({type: type.error});
    }
};

export {getUserHistory};