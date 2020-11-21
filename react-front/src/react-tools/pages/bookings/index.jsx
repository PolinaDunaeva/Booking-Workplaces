import React, {useEffect} from 'react';
import {Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, Checkbox, Collapse} from "@material-ui/core";
import BookingTableHead from "../../components/booking-header/index.jsx";
import BookingTableToolbar from "../../components/booking-toolbar/index.jsx";
import block from 'bem-cn-lite';
import {withSnackbar} from "notistack";
import './bookings.less';
import actionTypes from "../../store/action-types/bookings";

const b = block('bookings');
const txt = block('text');

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function Bookings({enqueueSnackbar, bookings, title, expanded, bookingsDispatcher}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('date');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [bookingsPerPage, setBookingsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = bookings.map((n) => ({place: n.place, desk: n.deskId, date: n.date}));
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, place, desk, date) => {
        const obj = {
            place,
            desk,
            date,
        };
        const selectedIndex = selected.findIndex(item => item.place === place);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, obj);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeBookingsPerPage = (event) => {
        setBookingsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = () => {
        bookingsDispatcher({type: actionTypes.delete, enqueueSnackbar, bookings: selected});
    };

    const isSelected = (name) => selected.findIndex(item => item.place === name) !== -1;

    useEffect(() => console.log(bookings, selected));

    const emptyBookings = bookingsPerPage - Math.min(bookingsPerPage, bookings.length - page * bookingsPerPage);

    return (
        <div className={b('root')}>
            <Paper className={b('paper')}>
                <BookingTableToolbar numSelected={selected.length} title={title} expanded={expanded} handleDelete={handleDelete}/>
                <TableContainer>
                    <Table
                        className={b('table')}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        aria-label="enhanced table"
                    >
                        <BookingTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            bookingCount={bookings.length}
                            expanded={expanded}
                        />
                        <TableBody>
                            {stableSort(bookings, getComparator(order, orderBy))
                                .slice(page * bookingsPerPage, page * bookingsPerPage + bookingsPerPage)
                                .map((booking, index) => {
                                    const isItemSelected = isSelected(booking.place);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, booking.place, booking.deskId, booking.date)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={booking.date}
                                            selected={isItemSelected}
                                            className={b()}
                                        >

                                            <TableCell padding="checkbox" className={index % 2 === 0 ? txt('gray') : txt('light')}>
                                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}/>
                                                </Collapse>
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none" className={index % 2 === 0 ? txt('gray') : txt('light')}>
                                                {booking.place}
                                            </TableCell>
                                            <TableCell align="right" className={index % 2 === 0 ? txt('gray') : txt('light')}>{booking.address}</TableCell>
                                            <TableCell align="right" className={index % 2 === 0 ? txt('gray') : txt('light')}>{booking.dateForShow}</TableCell>
                                            <TableCell align="right" className={index % 2 === 0 ? txt('gray') : txt('light')}>{booking.from}</TableCell>
                                            <TableCell align="right" className={index % 2 === 0 ? txt('gray') : txt('light')}>{booking.to}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyBookings > 0 && (
                                <TableRow style={{height: 53 * emptyBookings}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={bookings.length}
                    rowsPerPage={bookingsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeBookingsPerPage}
                    className={b('footer')}
                />
            </Paper>
        </div>
    );
}

export default withSnackbar(Bookings);