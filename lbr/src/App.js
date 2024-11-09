import React from 'react';
import './App.css';



function App() {
  return (
    <div className="row">
      
      <div className="col-md-2">

        <div className="sidebar-header">

        </div>
        <div className="sidebar-content">
          <div className='sidebar-icon'></div>
          Dashboard
        </div>

        <div className="sidebar-content highlighted">
          <div className='sidebar-icon'></div>
          Advanced Search
        </div>
      </div>

      <div className="col-md-10 main-view">

        <div className='App-header'>

        </div>

        <div className="main-content">
         main view
        </div>
        
      </div>
    </div>
  );
}

export default App;
