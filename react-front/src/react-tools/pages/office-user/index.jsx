import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../../store/store.jsx';
import actionTypesOffice from "../../store/action-types/office";
import {withSnackbar} from 'notistack';
import {CircularProgress} from "@material-ui/core";

import block from 'bem-cn-lite';
import './office-user.less';
import UserOfficeManager from "../../components/office-user-manager/index.jsx";

const b = block('office-user');

function UserOffice({enqueueSnackbar, match}) {

    const curDate = new Date();

    const {officeState, officeDispatcher} = useContext(Context).officeContext;
    const {userState, userDispatcher} = useContext(Context).userContext;
    const [floor, setFloor] = useState(officeState.floor);
    const [date, setDate] = useState(new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate()));
    const [desk, setDesk] = useState(0);


    let id = match.params.id;

    useEffect(() => {
        officeDispatcher({type: actionTypesOffice.get, enqueueSnackbar, id, floor});
    }, [floor]);


    if(officeState.loading) {
        return <div className={b('loader')}>
            <CircularProgress/>
        </div>
    }

    return (
        <UserOfficeManager id={id} userState={userState} officeState={officeState} officeDispatcher={officeDispatcher}
                          setFloor={setFloor} date={date} setDate={setDate} desk={desk} setDesk={setDesk} />
    )
}

export default withSnackbar(UserOffice);