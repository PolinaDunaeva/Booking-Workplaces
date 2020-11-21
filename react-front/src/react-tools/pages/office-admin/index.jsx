import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {CircularProgress} from "@material-ui/core";
import {Context} from '../../store/store.jsx';
import actionTypesOffice from "../../store/action-types/office";
import actionTypesCountries from "../../store/action-types/countries";
import actionTypesCities from "../../store/action-types/cities";
import {withSnackbar} from 'notistack';
import AdminOfficeManager from "../../components/office-admin-manager/index.jsx";

import block from 'bem-cn-lite';
import './office-admin.less';

const b = block('office-admin');

function AdminOffice({enqueueSnackbar, match}) {
    const curDate = new Date();

    const {officeState, officeDispatcher} = useContext(Context).officeContext;
    const {userState, userDispatcher} = useContext(Context).userContext;
    const {countriesState, countriesDispatcher} = useContext(Context).countriesContext;
    const {citiesState, citiesDispatcher} = useContext(Context).citiesContext;
    const [floor, setFloor] = useState(officeState.floor);
    const [date, setDate] = useState(new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate()));


    const [additions, deletions] = useMemo(() => [new Map(), new Map()], [floor]);
    const addElement = useCallback((item) => additions.set(`${item.x}_${item.y}` ,item), [additions]);
    const deleteElement = useCallback((item) => deletions.set(`${item.x}_${item.y}`, item), [deletions]);
    const undoAddition = useCallback((item) => additions.delete(`${item.x}_${item.y}`), [additions]);
    const undoDeletion = useCallback((item) => deletions.delete(`${item.x}_${item.y}`), [deletions]);


    let id = match.params.id;

    useEffect(() => {
        countriesDispatcher({type: actionTypesCountries.get, enqueueSnackbar});
        citiesDispatcher({type: actionTypesCities.get, enqueueSnackbar});
    }, []);

    useEffect(() => {
        if (id !== '0') {
            officeDispatcher({type: actionTypesOffice.get, enqueueSnackbar, id, floor});
        }
        return () => {
            officeDispatcher({type: actionTypesOffice.reset});
        }
    }, [floor]);

    if (officeState.loading || countriesState.loading || citiesState.loading) {
        return <div className={b('loader')}>
            <CircularProgress/>
        </div>
    }

    return officeState.name || id === '0' ?
        <AdminOfficeManager
            userState={userState}
            countriesState={countriesState}
            countriesDispatcher={countriesDispatcher}
            citiesState={citiesState}
            citiesDispatcher={citiesDispatcher}
            officeState={officeState}
            officeDispatcher={officeDispatcher}
            id={id}
            floor={floor}
            setFloor={setFloor}
            additions={additions}
            deletions={deletions}
            addElement={addElement}
            deleteElement={deleteElement}
            undoAddition={undoAddition}
            undoDeletion={undoDeletion}
            date={date}
        />

    : null
}

export default withSnackbar(AdminOffice);