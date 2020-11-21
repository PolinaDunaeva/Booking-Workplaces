import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import block from 'bem-cn-lite';

import './subordinates-form.less';
import actionTypesHrsSubordinates from "../../store/action-types/subordinates";
import {Context} from "../../store/store.jsx";

const b = block('subordinates');

export default function SubordinatesDialogList({email, open, onClose, enqueueSnackbar, handleDeleteHr}) {
    const {hrsSubordinatesState, hrsSubordinatesDispatcher} = useContext(Context).hrsSubordinatesContext;

    useEffect(() => {
        hrsSubordinatesDispatcher({type: actionTypesHrsSubordinates.get, enqueueSnackbar, email});
    }, []);

    if (hrsSubordinatesState.loading) {
        return <div>loading</div>
    }

    //console.log(hrsSubordinatesState);

    const handleClose = () => {
        if(noUsers){
            handleDeleteHr(email);
        }
        else {
            onClose();
        }
    };

    const deleteSubordinate = (userEmail) => {
        const type = actionTypesHrsSubordinates.delete;
        hrsSubordinatesDispatcher({type, enqueueSnackbar, hrEmail: email, userEmail});
    };

    let subordinates = [], noUsers =null;

    if (hrsSubordinatesState.list && hrsSubordinatesState.list.length > 0) {
        hrsSubordinatesState.list.forEach((user) => {
            subordinates.push({name: user.firstname + ' ' + user.lastname, email: user.email});
        });
    }

    if(subordinates.length === 0){
        noUsers = <ListItem key={-1}>
            <ListItemText primary={"No subordinates"} style={{marginLeft:"7px"}}/>
        </ListItem>;
    }


    return (
        <Dialog fullWidth='true' maxWidth='xs' onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}
                className={b('dialog')}>
            <DialogTitle id="simple-dialog-title" className={b('title')}>HR's subordinates</DialogTitle>
            <List>
                {noUsers}
                {subordinates.map((subordinate, index) => (
                    <ListItem button key={index}>
                        <ListItemAvatar>
                            <Avatar className={b('avatar')}>
                                <PersonIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={subordinate.name}/>
                        <IconButton className={b('delete-icon')} onClick={() => deleteSubordinate(subordinate.email)}>
                            <CloseIcon/>
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

