import React from "react"
import { render } from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger"
import { Provider } from "react-redux"

import App from "./container/App"

const initialState = {
  result: 1,
  lastValues: []
}

const mathReducer = (state = initialState, action) => {
  switch(action.type){
    case "ADD":
      // state = state + action.payload;
      state = {
        ...state,//this is just in case other state doesn't change
        // [memo]: ...state is the same meaning as below
        // result: state.result,
        // lastValues: state.lastValue,
        result: state.result + action.payload,
        lastValues: [...state.lastValues, action.payload]
      };
      break;
    case "SUBTRACT":
      // state = state - action.payload;
      state = {
        ...state,
        result: state.result - action.payload,
        lastValues: [...state.lastValues, action.payload]
      }
      break;
  }
  return state;
}

const userReducer = (state = {
  name: "Max",
  age: 27
}, action) => {
  switch(action.type){
    case "SET_NAME":
      state = {
        ...state,
        name: action.payload
      };
      break;
    case "SET_AGE":
      state = {
        ...state,
        age: action.payload
      }
      break;
  }
  return state;
}

const myLogger = (store) => (next) => (action) => { //pass 3 arguments which can be used at function
  console.log("Logged Action: ", action);
  next(action); //call action
}

// const store = createStore(reducer,1);//1 is initial statement
// const store = createStore(mathReducer);//state is defined in initialState
const store = createStore(
  combineReducers({math: mathReducer, user: userReducer}),
  {}, 
  applyMiddleware(myLogger,logger)
);//accept multiple reducers

store.subscribe(() =>{
  console.log("Store update!", store.getState())
});

render( 
  <Provider store={store}>
    <App />
  </Provider>,
  window.document.getElementById("app"));

// store.dispatch({
//   type: "ADD",
//   payload: 10
// });
// store.dispatch({
//   type: "ADD",
//   payload: 22
// });
// store.dispatch({
//   type: "SUBTRACT",
//   payload: 80
// });
// store.dispatch({
//   type: "SET_AGE",
//   payload: 30
// });
