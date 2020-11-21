import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {IconButton} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import block from 'bem-cn-lite';

import './add-user-form.less';
import {Context} from "../../store/store.jsx";
import actionTypes from "../../store/action-types/users/index.js";

const b = block('add-form');

export default function DialogSelect({role,listUsers,enqueueSnackbar,usersDispatcher}) {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const handleChange = (event) => {
        setEmail(String(event.target.value) || '');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddUser = () => {
        if(email === ''){
            return;
        }
        const type = actionTypes.addUserRole;
        usersDispatcher({type, enqueueSnackbar, email, role});
        setEmail('');
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton onClick={handleClickOpen} aria-label="add to group" className={b('button')} edge="end"><PersonAddIcon
                className={b('icon')}/></IconButton>
            <Dialog fullWidth='true' maxWidth='xs' disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose} className={b('box')}>
                <div className={b('box')}>
                <DialogTitle className={b('text')}>Choose the user</DialogTitle>
                <DialogContent>
                    <form className={b('container')}>
                        <FormControl className={b('formControl')}>
                            <InputLabel id="demo-dialog-select-label">User</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={email}
                                onChange={handleChange}
                                input={<Input/>}
                                className={b('select')}
                            >
                                <MenuItem value="" className={b('text')}>
                                    <em>None</em>
                                </MenuItem>
                                {listUsers.map((user) => (
                                    <MenuItem value={user.email} className={b('text')}>{user.firstname + ' ' + user.lastname}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleAddUser} color="primary">Add</Button>
                </DialogActions>
                </div>
            </Dialog>
        </React.Fragment>
    );
}