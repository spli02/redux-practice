import  { createStore } from "redux";

const initialState = {
  result: 1,
  lastValues: []
}

const reducer = (state = initialState, action) => {
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

// const store = createStore(reducer,1);//1 is initial statement
const store = createStore(reducer);//1 is initial statement

store.subscribe(() =>{
  console.log("Store update!", store.getState())
});
store.dispatch({
  type: "ADD",
  payload: 10
});
store.dispatch({
  type: "ADD",
  payload: 22
});
store.dispatch({
  type: "SUBTRACT",
  payload: 80
});

// import React from 'react'
// import { render } from 'react-dom'

// import { User } from './components/User'
// import { Main } from './components/Main'

// class App extends React.Component{
//   constructor(){
//     super();
//     this.state = {
//       username: "Max"
//     }
//   }

//   changeUsername (newName) {
//     this.setState({
//       username: newName
//     });
//   }

//   render(){
//     return(
//       <div className="container">
//         <Main changeUsername={this.changeUsername.bind(this)} />
//         <User username={this.state.username}/>
//       </div>
//     );
//   }
// }

// render(<App />, window.document.getElementById('app'))