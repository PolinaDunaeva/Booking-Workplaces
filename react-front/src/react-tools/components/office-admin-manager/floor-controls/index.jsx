import React from "react";
import {
    MenuItem,
    TextField,
} from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from "@material-ui/icons/Add";
import {withSnackbar} from 'notistack';

import CustomDialog from "../custom-dialog/index.jsx";
import request from "../../../store/commands/utils/request.js";
import {deleteOfficeMap} from "../../../store/commands/office/index.js";

import block from 'bem-cn-lite';
import './floor-controls.less';

const b = block('select');

const FloorControls = (
    {
        enqueueSnackbar,
        label, // label for inputs
        officeId,
        initialValue, // select initial value
        fields, // dialog form initial values
        itemList, // select list
        dialogWidth,
        setFloor,
        officeFields,
        changeFields,
    }) => {

    const addFloor = async (values) => {
        try {
            if(officeId !== '0') {
                await request('POST', 'office_manager/blueprint', {
                    office: officeId,
                    floor: values.floor,
                    height: values.height,
                    width: values.width,
                });
                setFloor(values.floor);
            } else {
                changeFields('floor', values.floor);
                changeFields('floors', [...officeFields.floors, +values.floor]);
            }
            return Promise.resolve();
        } catch (e) {
            enqueueSnackbar(e.message, {variant: 'error'});
            return Promise.reject();
        }
    };

    const removeFloor = async (value) => {
        try {
            if(officeId !== '0') {
                if(officeFields.floors.length <= 1) {
                    enqueueSnackbar('Office must have at least one floor', {variant: 'error'});
                    return Promise.reject();
                }
                const {data} = await request('GET', `/office?office=${officeId}&floor=${value.floor}`);
                await deleteOfficeMap(enqueueSnackbar, officeId, data.map);
                await request('DELETE', `office_manager/blueprint?office=${officeId}&floor=${value.floor}`);
                setFloor(+officeFields.floors[0] !== +value.floor ? +officeFields.floors[0] : +officeFields.floors[1]);
            } else {
                changeFields('floor', '');
                changeFields('floors', officeFields.floors.filter(item => item !== +value.floor));
            }
            return Promise.resolve();
        } catch (e) {
            enqueueSnackbar(e.message, {variant: 'error'});
            return Promise.reject();
        }
    };

    const validateNumberInputs = (values) => {
        let obj = {};
        for (let field in values) {
            obj[field] = {
                error: false,
                message: '',
            };
            if (values[field] === '') {
                obj[field].error = true;
                obj[field].message = `${field} cant be empty`;
            } else if(+values[field] <= 0) {
                obj[field].error = true;
                obj[field].message = `${field} must be positive`;
            }
        }
        if(itemList.includes(+values[label])) {
            obj[label].error = true;
            obj[label].message = `${label} ${values[label]} already exists`;
        }
        return obj;
    };

    const validateFloor = (value) => {
        let obj = {
            floor: {
                error: false,
                message: '',
            }
        };
        if(value.floor === '') {
            obj.floor.error = true;
            obj.floor.message = `Floor cant be empty`;
        } else if (!officeFields.floors.includes(+value.floor)) {
            obj.floor.error = true;
            obj.floor.message = `Floor ${value.floor} does not exist`;
        }
        return obj;
    };

    return (
        <div className={b('floor-container')}>
            <TextField
                label={label}
                variant='outlined'
                required
                select
                value={initialValue}
                onChange={e => {
                    setFloor(e.target.value);
                    changeFields('floor', e.target.value);
                }}
            >
                { itemList.map((item, index) => (
                    <MenuItem key={`f${index}`} value={item}>{item}</MenuItem>
                ))}
            </TextField>
            <CustomDialog
                action='Add'
                title={label}
                fields={fields}
                validateFields={validateNumberInputs}
                dialogHandler={addFloor}
                maxWidth={dialogWidth}
                button={<AddIcon color='primary'/>}
            />
            <CustomDialog
                action='Remove'
                title={label}
                fields={{[label]: fields[label]}}
                validateFields={validateFloor}
                dialogHandler={removeFloor}
                maxWidth='sm'
                button={<RemoveIcon color='secondary'/>}
            />
        </div>
    )
};

export default withSnackbar(React.memo(FloorControls));