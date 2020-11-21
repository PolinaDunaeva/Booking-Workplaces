import request from "../utils/request";

const getOffice = async (dispatch, type, enqueueSnackbar, id, floor ) => {
    try {
        dispatch({type: type.start});
        const {data} = await request('GET', `/office?office=${id}${!!floor ? `&floor=${floor}` : ''}`);
        const bookings = {};
        for(let desk of data.map.desks) {
            const arr = await request('GET', `/desk?id=${desk.id}`);
            bookings[desk.id.toString()] = [...arr.data.map(item => {
                const temp = item.date.split('-');
                const date = new Date(temp[2], temp[1] - 1, temp[0]);
                return {...item, date};
            })];
        }
        dispatch({type: type.success, payload: {...data, id, bookings}});
    } catch (e) {
        enqueueSnackbar(e.message, {variant: 'error'});
    }
};

const postOffice = async (dispatch, type, enqueueSnackbar, floor, name, country, newCountry, city, newCity,
                          height, width, delta) => {
    try {
        dispatch({type: type.start});
        if(newCountry) {
            await request('POST', `/office_manager/country?name=${country}`)
        }
        if(newCity) {
            await request('POST', `/office_manager/city?name=${city}&country=${country}`)
        }
        await request('POST', `/office_manager/office?name=${name}&city=${city}`);
        let {data} = await request('GET', '/offices');
        let id = data.find(item => item.country === country && item.city === city && item.name === name);
        if(!id){
            console.log('no id');
            return
        }
        id = id.id;
        await request('POST', '/office_manager/blueprint', {
            office: id,
            floor,
            height,
            width
        });
        await putOfficeMap(enqueueSnackbar, id, floor, delta);
        dispatch({type: type.success, payload: id});
        return id;
    } catch (e) {
        enqueueSnackbar(e.message, {variant: 'error'});
    }
};

const putOffice = async (dispatch, type, enqueueSnackbar, id, floor, delta) => {
    try {
        dispatch({type: type.start});
        await putOfficeMap(enqueueSnackbar, id, floor, delta);
        dispatch({type: type.success});
    } catch (e) {
        enqueueSnackbar(e.message, {variant: 'error'});
    }
};

const putOfficeMap = async (enqueueSnackbar, id, floor, delta) => {
    let desks = [], items = [];
    try {
        console.log(delta);
        await deleteDesks(enqueueSnackbar, delta.deletions.values());
        for (let value of delta.additions.values()) {
            value.name === 'desk' ? desks.push(value) : items.push({
                x: value.x,
                y: value.y,
                type: value.name,
            });
        }
        for(let desk of desks) {
            try {
                await request('POST', '/office_manager/desk', {
                    dir: desk.dir,
                    floor: floor,
                    office: id,
                    x: desk.x,
                    y: desk.y,
                })
            } catch (e) {
                enqueueSnackbar(e.message, {variant: 'error'});
            }
        }
        try {
            await request('POST', '/office_manager/items', {
                floor: floor,
                office: id,
                items: items,
            })
        } catch (e) {
            enqueueSnackbar(e.message, {variant: 'error'});
        }
    } catch (e) {
        enqueueSnackbar(e.message, {variant: 'error'});
    }
};

const deleteDesks = async (enqueueSnackbar, deletions) => {
    const ids = [];
    for (let value of deletions) {
        try {
            if(value.name === 'desk') {
                await request('DELETE', `/office_manager/desk?id=${value.id}`)
            } else {
                ids.push(value.id);
            }
        } catch (e) {
            enqueueSnackbar(e.response.data, {variant: 'error'});
        }
    }
    try {
        await request('DELETE', '/office_manager/items', {
            ids,
        });
    } catch (e) {
        enqueueSnackbar(e.response.data, {variant: 'error'});
    }
};

const deleteOffice = async (dispatch, type, enqueueSnackbar, id, floors) => {
    try {
        dispatch({type: type.start});
        for (let floor of floors) {
            const {data} = await request('GET', `/office?office=${id}&floor=${floor}`);
            await deleteOfficeMap(enqueueSnackbar, id, data.map);
            await request('DELETE', `/office_manager/blueprint?office=${id}&floor=${floor}`);
        }
        await request('DELETE', `/office_manager/office?id=${id}`);
        dispatch({type: type.success});
    } catch (e) {
        enqueueSnackbar(e.message, {variant: 'error'});
    }
};

const deleteOfficeMap = async (enqueueSnackbar, id, map) => {
    const deletions = map.desks.map(desk => ({
        ...desk,
        name: 'desk',
    }));
    try {
        await deleteDesks(enqueueSnackbar, deletions.concat(map.items));
    } catch (e) {
        enqueueSnackbar(e.message, {variant: 'error'});
    }
};


export {getOffice, putOffice, postOffice, deleteOffice, deleteOfficeMap};
