import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import React from "react";
import Collapse from "@material-ui/core/Collapse/Collapse";
import block from 'bem-cn-lite';
import './booking-header.less';

const b = block('booking-header');

const headCells = [
    { id: 'place', numeric: false, disablePadding: true, label: 'Place' },
    { id: 'address', numeric: true, disablePadding: false, label: 'Address' },
    { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
    { id: 'from', numeric: true, disablePadding: false, label: 'From' },
    { id: 'to', numeric: true, disablePadding: false, label: 'To' },
];

export default function BookingTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, bookingCount, onRequestSort,expanded } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className={b()}>
                <TableCell padding="checkbox">
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < bookingCount}
                        checked={bookingCount > 0 && numSelected === bookingCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'Select all bookings' }}
                    />
                    </Collapse>
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        className={b('text')}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}

                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

BookingTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    bookingCount: PropTypes.number.isRequired,
};