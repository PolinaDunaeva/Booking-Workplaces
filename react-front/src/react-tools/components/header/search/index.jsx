import SearchIcon from "@material-ui/icons/Search";
import {InputBase, InputAdornment, List, ListItem, Popper, ClickAwayListener} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import React, {useState} from "react";

import block from 'bem-cn-lite';
import './search.less';

const b = block('search');

const Search = ({usersState, searchValue, setSearchValue}) => {

    const [open, setOpen] = useState(false);

    let searchList = '';
    if (!!searchValue) {
        const string = searchValue.toLowerCase();
        const userList = usersState.list.filter(item => item.firstname.toLowerCase().includes(string) ||
            item.lastname.toLowerCase().includes(string) || item.email.toLowerCase().includes(string));
        searchList = (
            <List className={b('list')}>
                {userList.map((item, index) => (
                    <ListItem key={index} button>
                        {item.firstname} {item.lastname}
                    </ListItem>
                    )
                )}
            </List>
        );
    }

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div id='search' className={b('container')}>
                <div className={b('input')}>
                    <InputBase
                        placeholder={"Search..."}
                        classes={{ root: b('inputRoot') }}
                        value={searchValue}
                        startAdornment={<InputAdornment position='start'><SearchIcon/></InputAdornment>}
                        endAdornment={searchValue ? <InputAdornment position='end'>
                            <ClearIcon onClick={() => setSearchValue('')}/>
                        </InputAdornment> : ''}
                        onChange={event => setSearchValue(event.target.value)}
                        onFocus={() => setOpen(true)}
                    />
                </div>
                <Popper
                    placement='bottom'
                    open={open}
                    anchorEl={document.getElementById('search')}
                    className={b('popper')}
                >
                    {searchList}
                </Popper>
            </div>
        </ClickAwayListener>
    )
};

export default Search;