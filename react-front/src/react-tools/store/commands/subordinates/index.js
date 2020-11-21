import request from "../utils/request";

const getHrsSubordinate = async (dispatch, type, enqueueSnackbar, email) => {
    try {
        dispatch({type: type.start});
        const {data} = await request('GET', `/admin/subordinatesbyemail/?hr=${email}`);
        dispatch({type: type.success, payload: data});
    } catch (e) {
        enqueueSnackbar('Smth goes wrong', {variant: 'error'});
        dispatch({type: type.error});
    }
};

const deleteSubordinate = async (dispatch,type,enqueueSnackbar,hrEmail,userEmail) => {
    try {
        dispatch({type: type.start});
        await request('DELETE', `/admin/subordinates/?hr=${hrEmail}&subordinate=${userEmail}`);
        const {data} = await request('GET', `/admin/subordinatesbyemail/?hr=${hrEmail}`);
        dispatch({type: type.success, payload: data});
    } catch (e) {
        enqueueSnackbar('Smth goes wrong', {variant: 'error'});
        dispatch({type: type.error});
    }
};

export {getHrsSubordinate,deleteSubordinate};