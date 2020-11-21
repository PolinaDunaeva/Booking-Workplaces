import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField} from "@material-ui/core";

import block from 'bem-cn-lite';
import './custom-dialog.less';

const b = block('dialog');


const CustomDialog = ({action, title, fields, validateFields, dialogHandler, maxWidth, button}) => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({...fields});
    const [errors, setErrors] = useState({
        floor: false,
        height: false,
        width: false,
    });
    const [errorMessages, setMessages] = useState({
        floor: '',
        height: '',
        width: '',
    });

    const setError = (key, value) => {
        let obj = {...errors};
        obj[key] = value;
        setErrors(obj);
    };

    const changeValues = (name, value) => {
        if(errors[name]) {
            setError(name, false);
        }
        const obj = {...values};
        obj[name] = value;
        setValues(obj);
    };

    const submit = () => {
        if(validate()) {
            dialogHandler(values)
                .then(() => setOpen(false));
        }
    };

    const validate = () => {
        let obj = validateFields(values);
        let err = {}, msg = {};
        let res = true;
        for (let field in obj) {
            err[field] = obj[field].error;
            msg[field] = obj[field].message;
            if(err[field] === true) {
                res = false;
            }
        }
        setErrors(err);
        setMessages(msg);
        return res;
    };

    return (
        <React.Fragment>
            <IconButton className={b('button')} onClick={() => setOpen(true)}>
                {button}
            </IconButton>
            <Dialog
                open={open}
                fullWidth
                maxWidth={maxWidth}
                onClose={() => setOpen(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{action} {title}</DialogTitle>
                <DialogContent className={b('input', {container: true})}>
                    {Object.keys(values).map((item, index) =>
                        <TextField
                            key={index}
                            margin="dense"
                            label={item}
                            value={values[item]}
                            variant='outlined'
                            error={errors[item]}
                            helperText={errorMessages[item]}
                            type="number"
                            className={b('input')}
                            onChange={e => changeValues(item, e.target.value)}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                    <Button onClick={submit} color="primary">{action}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

export default React.memo(CustomDialog);