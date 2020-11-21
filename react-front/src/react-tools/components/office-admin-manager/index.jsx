import React, {useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import Planner from "../../pages/planner/index.jsx";
import {withSnackbar} from 'notistack';


import block from 'bem-cn-lite';
import './office-admin-manager.less'
import {Button, Typography,} from "@material-ui/core";
import actionTypesOffice from "../../store/action-types/office";
import Autocomplete from "./autocomplete/index.jsx";
import FloorControls from "./floor-controls/index.jsx";

const b = block('office-admin-manager');

function AdminOfficeManager({enqueueSnackbar, id, officeState, officeDispatcher, userState, countriesState,
                                citiesState, floor, setFloor, additions, deletions, addElement, deleteElement,
                                undoAddition, undoDeletion, date}) {

    const [officeFields, setOfficeFields] = useState({
        name: officeState.name,
        country: officeState.country,
        city: officeState.city,
        floor: officeState.floor,
        floors: officeState.floors,
    });

    const arrays = {
        country: useMemo(() => countriesState.list, [countriesState.list]),
        city: useMemo(() => citiesState.list.filter(item => item.country === officeFields.country)
            .map(item => item.name), [citiesState.list, officeFields.country]),
        name: [],
    };

    const bookedDesks = useMemo(() => officeState.bookings ? Object.keys(officeState.bookings).filter(key => {
        for(let item of officeState.bookings[key]) {
            const diff = item.date.getTime() - date.getTime();
            if(diff >= 0 && diff < 86400000) {
                return true;
            }
        }
        return false;
    }) : [], [date, officeState]);

    function saveOffice() {
        if(!validateFields()) {
            return;
        }
        const isNew = {
            newCity: false,
            newCountry: false,
        };
        if(!countriesState.list.includes(officeFields.country)) {
            isNew.newCountry = true;
        }
        if(!citiesState.list.find(item => item.name === officeFields.city)) {
            isNew.newCity = true
        }
        const type = id === '0' ? actionTypesOffice.post : actionTypesOffice.put;
        officeDispatcher({type, officeFields, enqueueSnackbar, id, ...isNew, delta: {additions, deletions},
            height: officeState.height, width: officeState.width});
    }

    const validateFields = () => {
        for (let key in officeFields) {
            if (officeFields[key] === '') {
                return false;
            }
        }
        let val = +officeFields.floor;

        return val === val && val >= 0;
    };

    function deleteOffice() {
        officeDispatcher({type: actionTypesOffice.delete, enqueueSnackbar, id, floors: officeState.floors,
            map: officeState.map});
    }

    function changeFields(field,value) {
        const obj={...officeFields};
        obj[field]=value;
        setOfficeFields(obj);
    }

    return (
        <div className={b('row')}>
            <Planner
                officeState={officeState}
                addElement={addElement}
                deleteElement={deleteElement}
                undoAddition={undoAddition}
                undoDeletion={undoDeletion}
                additions={additions}
                deletions={deletions}
                bookedDesks={bookedDesks}
            />
            <div className={b('container')}>
                <Typography variant="h6">{`${userState.firstName} ${userState.lastName}`}</Typography>
                <div className={b('text')}>{officeState.name ? `You have chosen ${officeState.name}` : 'Add office'}</div>
                <Link to='/' className={b('link')}><Button variant='outlined' color='primary'>Back</Button></Link>
                {Object.keys(officeFields).map((item,index)=>(
                    item === 'floors' ? null : item === 'floor' ?
                        <FloorControls
                            key={item}
                            officeId={id}
                            label={item}
                            initialValue={officeState.floor || floor || officeFields.floor}
                            fields={ id !== '0' ? {
                                floor: '',
                                height: '10',
                                width: '10',
                            } : { floor: ''}}
                            dialogWidth={id === '0' ? 'sm' : 'md'}
                            itemList={officeFields.floors}
                            setFloor={setFloor}
                            officeFields={officeFields}
                            changeFields={changeFields}
                        />:
                        <Autocomplete
                            key={item}
                            name={item}
                            inputValue={officeFields[item]}
                            itemList={arrays[item]}
                            changeFields={changeFields}
                        />
                ))}
                <div className={b('row')}>
                    <Button variant='contained' color='primary' onClick={() => saveOffice()}>Save</Button>
                    <Button variant='contained' color='secondary' onClick={() => deleteOffice()}>Delete</Button>
                </div>
            </div>
        </div>
    )
}

export default withSnackbar(AdminOfficeManager);