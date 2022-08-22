import { createStore, applyMiddleware , combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import loadingReducer from './reducers/loading';
import idsReducer from './reducers/ids';
import messageReducer from './reducers/message';


const middlewares = [thunk]

const reducer = combineReducers({
    loading : loadingReducer ,
    message : messageReducer ,
    ids : idsReducer,
})


const initialState = {}

const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middlewares)))

export default store ;
