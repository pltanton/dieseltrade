import React, { Component } from 'react';
import FullPage from './FullPage'
import Menu from './Menu'

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <FullPage />
      </div>
    );
  }
}

export default App;
