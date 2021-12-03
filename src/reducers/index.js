import TaskReducer from "./task.services";
import {combineReducers} from "redux";

const allReducer = combineReducers({
  task: TaskReducer
})


export default allReducer;
