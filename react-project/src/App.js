import 'core-js'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routing from './routing';
import Footer from './htmlElements/footer';

function App() {
  return (
    <div >
      <Routing />
      <footer className="rcs-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
