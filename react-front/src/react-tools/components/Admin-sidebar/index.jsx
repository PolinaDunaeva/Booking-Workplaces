import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useState} from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import PeopleIcon from '@material-ui/icons/People';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PersonIcon from '@material-ui/icons/Person';
import {Redirect,Link} from "react-router-dom";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import './admin-sidebar.less';

import block from 'bem-cn-lite';

const b = block('admin-sidebar');

export default function SwipeableTemporaryDrawer() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [itemClicked, setItemClicked] = useState(-1);

    const buttonsList = [
        {label: 'Users', icon: (<PeopleIcon/>), link: '/users'},
        {label: 'Change role', icon: (<PersonIcon/>), link: '/change'},
        {label: 'New Location', icon: (<AddLocationIcon/>), link: '/office/0'},
        {label: 'Map editor', icon: (<ApartmentIcon/>), link: '/planner'}
    ];

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setMenuVisible(open);
    };

    function buttonClick(index){
        setItemClicked(index);
        //history.pushState(undefined, buttonsList[index].label, buttonsList[index].link);
    }

    if (itemClicked >= 0) {
       setTimeout(() => setItemClicked(-1), 0);
       return <Redirect to={buttonsList[itemClicked].link}/>
    }

    const list = (
        <div
            className={b()}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List >
                {buttonsList.slice(0,2).map((elem, index) => (
                    <ListItem button key={elem.label} onClick={() => buttonClick(index)}>
                        <ListItemIcon className={b('icon')}>{elem.icon}</ListItemIcon>
                        <ListItemText primary={elem.label} className={b('text')}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {buttonsList.slice(2,4).map((elem, index) => (
                    <ListItem button key={elem.label} onClick={() => buttonClick(index+2)} >
                        <ListItemIcon className={b('icon')}>{elem.icon}</ListItemIcon>
                        <ListItemText primary={elem.label} className={b('text')}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key={'top'}>
                <Button onClick={toggleDrawer(!menuVisible)}><KeyboardArrowDownIcon className={b('show__icon')}
                                                                                   fontSize={"large"}/></Button>
                <SwipeableDrawer
                    anchor={'top'}
                    open={menuVisible}
                    onClose={toggleDrawer( false)}
                    onOpen={toggleDrawer(true)}
                >
                    {list}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
