import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import block from 'bem-cn-lite';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import DialogSelect from "../add-user-form/index.jsx";
import Collapse from '@material-ui/core/Collapse';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


import './group-of-users.less'
import {Context} from "../../store/store.jsx";
import TableBody from "@material-ui/core/TableBody";
import actionTypes from "../../store/action-types/users";
import SubordinatesDialogList from "../subordinates-form/index.jsx";
import actionTypesHrsSubordinates from "../../store/action-types/subordinates";

const b = block('group');

export default function Group(props) {
    const { group, enqueueSnackbar } = props;
    const {usersState,usersDispatcher} = useContext(Context).usersContext;
    const [open,setOpen] = useState(false);
    const [emailForDialog, setEmailForDialog] = useState("");

    const listUsers=usersState.list.filter((user) => user.roles.includes(group.role) ? null : user);
    //console.log(listUsers);

    const handleDeleteRole = (emailUser) => {
        const type = actionTypes.deleteUserRole;
        usersDispatcher({type, email: emailUser, role: group.role});
    };

    const handleDeleteUserRole = (emailUser) => {
        if(group.role==='hr'){
            setOpen(true);
            setEmailForDialog(emailUser);
        } else {
            handleDeleteRole(emailUser);
        }
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <React.Fragment>
        <Grid item xs={12} md={6}>
                <Card className={b('card')}>
                    <div className={b('cardDetails')}>
                        <CardContent>
                            <div className={b('header-card')}>
                            <Typography component="h2" variant="h5" className={b('title')}>
                                {group.title}
                            </Typography>
                            <DialogSelect role={group.role} listUsers={listUsers} enqueueSnackbar={group.enqueueSnackbar} usersDispatcher={usersDispatcher}/>
                            </div>
                            <Typography variant="subtitle1" paragraph>
                                <Table size="small">
                                    <TableBody>
                                    {group.users.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell className={b('text')}><FiberManualRecordIcon fontSize="small" className={b('icon')} /></TableCell>
                                            <TableCell className={b('text')}>{user.firstname + ' ' + user.lastname}</TableCell>
                                            <TableCell className={b('text')}>{user.email}</TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="delete" onClick={() => handleDeleteUserRole(user.email)}>
                                                    <CloseIcon className={b('text')}/>
                                                </IconButton>
                                                <Collapse in={open} timeout="auto" unmountOnExit>
                                                    <SubordinatesDialogList email={emailForDialog} handleDeleteHr={handleDeleteRole} open={open} onClose={handleClose} enqueueSnackbar={enqueueSnackbar}/>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
        </Grid>
        </React.Fragment>
    );
}

Group.propTypes = {
    group: PropTypes.object,
};