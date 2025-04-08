import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { roomsReducer, userReducer, appReducer } from './reducers';

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	rooms: roomsReducer,
});

export const store = createStore(reducer, composer(applyMiddleware(thunk)));
