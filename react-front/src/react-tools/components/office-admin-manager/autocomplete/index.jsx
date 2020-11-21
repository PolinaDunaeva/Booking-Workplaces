import React, {useEffect, useRef, useState, useMemo} from "react";
import {TextField, Popper, List, ListItem, ClickAwayListener} from "@material-ui/core";

import block from 'bem-cn-lite';
import './autocomplete.less';

const b = block('autocomplete');

function format(string) {
    return !!string ? string[0].toUpperCase() + string.slice(1) : '';
}


const Autocomplete = ({name, inputValue, itemList, changeFields}) => {

    const [open, setOpen] = useState(false);

    let anchorEl = useRef(null);

    let val = inputValue.trim().toLowerCase();

    let list = useMemo(() => itemList.filter(item => item.toLowerCase().includes(val)), [itemList, val]);

    const handleListItemClick = (name, item) => {
        changeFields(name, item);
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={() => open && setOpen(false)}>
            <div>
                <TextField
                    id={name}
                    ref={anchorEl}
                    value={inputValue}
                    variant="outlined"
                    margin="normal"
                    inputProps={{
                        maxLength: 50,
                    }}
                    required
                    fullWidth
                    name={name}
                    className={b('input')}
                    label={name}
                    type="text"
                    autoComplete='none'
                    onChange={e => changeFields(name, e.target.value)}
                    onFocus={() => setOpen(!!list.length)}
                    onBlur={e => changeFields(name, format(e.target.value))}
                />
                <Popper placement='bottom-start' disablePortal open={open} anchorEl={anchorEl.current} className={b('popper')}>
                    <List className={b('list')}>
                        {list.map((item) => <ListItem key={item} button onClick={() => handleListItemClick(name, item)}>{item}</ListItem>)}
                    </List>
                </Popper>
            </div>
        </ClickAwayListener>
    )

};

export default React.memo(Autocomplete);