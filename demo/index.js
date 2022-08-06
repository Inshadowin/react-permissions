import React from 'react';
import { createRoot } from 'react-dom/client';

import Permissions from './permissions';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <Permissions />
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;
