import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from "prop-types";
import React from "react";
import block from 'bem-cn-lite';
import './booking-toolbar.less';
import Collapse from "@material-ui/core/Collapse/Collapse";

const b = block('booking-toolbar');

export default function BookingTableToolbar(props) {
    const { numSelected, title, expanded, handleDelete } = props;

    return (
        <Toolbar
            className={clsx(b('root'), {
                [b('highlight')]: numSelected > 0 && expanded,
            })}
        >
            {numSelected > 0 && expanded ? (
                <Typography className={b('title')} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={b('title')} variant="h6" id="tableTitle" component="div">
                    {title}
                </Typography>
            )}

            {numSelected > 0 && expanded ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list" className={b('icon')}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

BookingTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
};