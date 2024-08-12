import React from 'react';
import './App.css';
import Todos from "./containers/Todos/Todos";

function App() {
  return (
    <div className="layout">
      <h1>Приложение TODOS</h1>
      <Todos/>
    </div>
  );
}

export default App;
