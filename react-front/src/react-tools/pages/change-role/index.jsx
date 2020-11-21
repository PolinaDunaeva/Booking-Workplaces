import React, {useContext, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Group from '../../components/group-of-users/index.jsx';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function ChangeRole({usersState, admins, hrs,enqueueSnackbar}) {

    let groups;
    if (admins.length !== 0 && hrs.length !== 0) {
        groups = [{
            title: 'Admins',
            users: admins,
            role: 'admin',
        },
            {
                title: 'HRs',
                users: hrs,
                role: 'hr',
            }
        ];
    } else {
        groups = [];
    }



    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="lg">
                <main>
                    <Grid container spacing={4}>
                        {groups.map((group) => (<Group key={group.title} group={group} usersState={usersState} enqueueSnackbar={enqueueSnackbar}/>))}
                    </Grid>
                </main>
            </Container>
        </React.Fragment>
    );
}