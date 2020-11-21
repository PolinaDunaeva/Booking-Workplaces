import React, {useContext, useEffect} from 'react';
import {Typography, Button, CircularProgress} from "@material-ui/core";
import {Link} from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withSnackbar} from 'notistack';

import block from 'bem-cn-lite';
import './list-of-users.less'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const b = block('list-of-users');
const txt = block('text');

function ListUsers({enqueueSnackbar, usersState, userState}) {

    if(usersState.loading || (usersState.list.length !== 0 && !Array.isArray(usersState.list[0].roles))) {
        return <div className={b('loader')}>
            <CircularProgress/>
        </div>;
    }

    return (
        <React.Fragment>
            <Table size="small" className={b()}>
                <TableHead>
                    <TableRow className={b('table-top')}>
                        <TableCell className={b('text')}>ID</TableCell>
                        <TableCell className={b('text')}>Name</TableCell>
                        <TableCell className={b('text')}>Email</TableCell>
                        <TableCell className={b('text')}>Role</TableCell>
                        <TableCell align="right" className={b('text')}>History</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersState.list.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell className={index % 2 === 0 ? txt('gray') : txt('blue')}>{index + 1}</TableCell>
                            <TableCell className={index % 2 === 0 ? txt('gray') : txt('blue')}>{user.firstname + ' ' + user.lastname}</TableCell>
                            <TableCell className={index % 2 === 0 ? txt('gray') : txt('blue')}> {user.email} </TableCell>
                            <TableCell className={index % 2 === 0 ? txt('gray') : txt('blue')}>
                                {user.roles.length === 0 ? 'user' : user.roles.join('/n')}</TableCell>
                            <TableCell align="right" className={index % 2 === 0 ? txt('gray') : txt('blue')}><Link to={`/history/${user.email}`} className={b('link')}>
                                 <Button> Go to   <ArrowForwardIcon className={b('icon')}/>  </Button>
                            </Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

export default withSnackbar(ListUsers);