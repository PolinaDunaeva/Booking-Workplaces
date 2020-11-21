import React, {useEffect, useContext} from "react";
import {Context} from "../../store/store.jsx";
import actionTypesUserHistory from "../../store/action-types/user-history";
import Bookings from "../../pages/bookings/index.jsx";

export default function UserHistory({match, userState, usersState, officesState, enqueueSnackbar}) {
    const {userHistoryState, userHistoryDispatcher} = useContext(Context).userHistoryContext;

    let email = match.params.email;
    const user = usersState.list.find((user) => user.email === email);


    useEffect(() => {
        userHistoryDispatcher({type: actionTypesUserHistory.get, enqueueSnackbar, role: userState.role, key: email});
    }, []);



    const bookings = [];
    let officePlace='',office='',officeAddress='',date='';
    if(userHistoryState.list && userHistoryState.list.length !== 0) {
        userHistoryState.list.forEach((booking) => {
            officePlace = booking.deskId + " desk, " + booking.floor + " floor";
            date = booking.date.format('dddd, DD MMMM YYYY');
            office = officesState.list.find((office) => office.id === booking.officeId);
            officeAddress = office.name + ', ' + office.city + ', ' + office.country;
            bookings.push({...booking, address: officeAddress, place: officePlace, dateForShow: date});
        });
    }
    const title = "Bookings history of " + user.firstname + ' ' + user.lastname;

    if(bookings.length === 0){
        bookings.push({place: "No Bookings", from:" - ",to:" - ", address: " - ",dateForShow: " - "})
    }

    return (<div>
        <Bookings bookings={bookings} title={title} expanded={false}/>
    </div>);

}

