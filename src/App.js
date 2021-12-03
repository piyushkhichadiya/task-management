import React from "react";
import { Route } from "react-router-dom";
import './App.scss';
import Task from "./components/task";

function App() {

  return (
    <div className="App">
      {
        <Task/>
      }
    </div>
  );
}

export default App;
