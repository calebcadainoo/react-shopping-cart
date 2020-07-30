// feature 1
import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      order: [],
    }
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });

    if (!alreadyInCart) {
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems});
    // update on local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x)=> x._id !== product._id)
    })
    // update on local storage
    localStorage.setItem(
      "cartItems", 
      JSON.stringify(cartItems.filter((x)=> x._id !== product._id))
    );
  }

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
                <Products addToCart={this.addToCart}></Products>
              </div>
              <div className="sidebar">
                <Cart cartItems={this.state.cartItems}
                    removeFromCart={this.removeFromCart}
                    createOrder={this.createOrder}
                ></Cart>
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
