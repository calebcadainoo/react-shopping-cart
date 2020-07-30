// feature 1
import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <div className="grid-container">
          {/* page header */}
          <header className="page-header">
            <a href="/">React Shopping Cart</a>
          </header>
    
          {/* page section */}
          <section className="page-section">
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <Products></Products>
              </div>
              <div className="sidebar">
                <Cart></Cart>
              </div>
            </div>
          </section>
    
          {/* page footer */}
          <footer className="page-footer">
            All rights reserved.
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
