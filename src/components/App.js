import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import BooksCatalog from './BooksCatalog';

import LogIn from './LogIn';

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Route path="/" exact component={LogIn} />
        <Route path="/bookscatalog" component={BooksCatalog} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
