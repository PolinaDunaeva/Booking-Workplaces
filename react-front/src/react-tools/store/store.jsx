import React, {createContext, useReducer} from 'react';

import {userReducer, initialUser} from './reducer/user';
import {usersReducer, initialUsers} from "./reducer/users";
import {officesReducer, initialOffices} from './reducer/offices';
import {officeReducer, initialOffice} from './reducer/office';
import {countriesReducer, initialCountries} from "./reducer/countries";
import {citiesReducer, initialCities} from "./reducer/cities";
import {bookingsReducer, initialBookings} from "./reducer/bookings"
import {userHistoryReducer, initialUserHistory} from "./reducer/user-history"
import {hrsSubordinatesReducer, initialHrsSubordinates} from "./reducer/subordinates";

import {dispatchUserMiddleware} from './middleware/user';
import {dispatchUsersMiddleware} from "./middleware/users";
import {dispatchOfficesMiddleware} from './middleware/offices';
import {dispatchOfficeMiddleware} from './middleware/office';
import {dispatchCountriesMiddleware} from "./middleware/countries";
import {dispatchCitiesMiddleware} from "./middleware/cities";
import {dispatchBookingsMiddleware} from "./middleware/bookings";
import {dispatchUserHistoryMiddleware} from './middleware/user-history';
import {dispatchHrsSubordinatesMiddleware} from "./middleware/subordinates";

const Context = createContext({});

export default function ({children}) {
	const [userState, userDispatch] = useReducer(userReducer, initialUser);
	const [usersState, usersDispatch] = useReducer(usersReducer, initialUsers);
	const [officesState, officesDispatch] = useReducer(officesReducer, initialOffices);
	const [officeState, officeDispatch] = useReducer(officeReducer, initialOffice);
	const [countriesState, countriesDispatch] = useReducer(countriesReducer, initialCountries);
	const [citiesState, citiesDispatch] = useReducer(citiesReducer, initialCities);
	const [bookingsState, bookingsDispatch] = useReducer(bookingsReducer, initialBookings);
	const [userHistoryState,userHistoryDispatch] = useReducer(userHistoryReducer,initialUserHistory);
	const [hrsSubordinatesState, hrsSubordinatesDispatch] = useReducer(hrsSubordinatesReducer, initialHrsSubordinates);

	const store = {
		userContext: {userState, userDispatcher: dispatchUserMiddleware(userDispatch)},
		officesContext: {officesState, officesDispatcher: dispatchOfficesMiddleware(officesDispatch)},
		usersContext:{usersState,usersDispatcher:dispatchUsersMiddleware(usersDispatch)},
		officeContext: {officeState, officeDispatcher: dispatchOfficeMiddleware(officeDispatch)},
		countriesContext: {countriesState, countriesDispatcher: dispatchCountriesMiddleware(countriesDispatch)},
		citiesContext: {citiesState, citiesDispatcher: dispatchCitiesMiddleware(citiesDispatch)},
		bookingsContext: {bookingsState, bookingsDispatcher: dispatchBookingsMiddleware(bookingsDispatch)},
		userHistoryContext: {userHistoryState, userHistoryDispatcher: dispatchUserHistoryMiddleware(userHistoryDispatch)},
		hrsSubordinatesContext: {hrsSubordinatesState, hrsSubordinatesDispatcher:dispatchHrsSubordinatesMiddleware(hrsSubordinatesDispatch)},
	};

	return (
		<Context.Provider value={store}>
			{children}
		</Context.Provider>
	);
};
export {Context};

