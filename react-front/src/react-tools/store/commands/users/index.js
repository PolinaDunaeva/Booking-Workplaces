import request from "../utils/request";


const getUsers = async (dispatch, type, enqueueSnackbar,role) => {
    if(role === 'noAccess') {
        return;
    }
    try {
        dispatch({type: type.start});
        const {data} = await request('GET', (role === 'admin' || role ==='hr') ? '/hr/subordinates':'/users');
        dispatch({type: type.success, payload: data});
    } catch (e) {
        enqueueSnackbar('Smth goes wrong', {variant: 'error'});
        dispatch({type: type.error});
    }
};

const deleteUserRole = async (dispatch,type,enqueueSnackbar,email,role) => {
    try {
        dispatch({type: type.start});
        await request('DELETE', `/admin/roles?email=${email}&role=${role}`);
        const {data} = await request('GET', '/hr/subordinates');
        dispatch({type: type.success, payload: data});
    } catch (e) {
        enqueueSnackbar('Smth goes wrong', {variant: 'error'});
        dispatch({type: type.error});
    }
};

const addUserRole = async (dispatch,type,enqueueSnackbar,email,role) => {
    try {
        dispatch({type: type.start});
        await request('POST', `/admin/roles?email=${email}&role=${role}`);
        const {data} = await request('GET', '/hr/subordinates');
        dispatch({type: type.success, payload: data});
    } catch (e) {
        enqueueSnackbar('Smth goes wrong', {variant: 'error'});
        dispatch({type: type.error});
    }
};

export {getUsers,addUserRole,deleteUserRole};