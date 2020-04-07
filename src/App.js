import React from 'react';

// containers
import Welcome from './containers/Welcome';
import Portfolio from './containers/Portfolio'

function App() {
  return (
    <Welcome render={data => (
      <Portfolio data={data} />
    )} />  
  );
}

export default App;
