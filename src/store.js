import { createStore } from "@reduxjs/toolkit";
import starWarsReducer from "./reducer";

const store = createStore(
  starWarsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
