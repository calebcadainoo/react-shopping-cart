// feature 1
import React from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    }
  }

  sortProducts = (e) => {
    // impl
    console.log(e.target.value);
    const sort = e.target.value;
    this.setState(state => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => (
        sort === "lowest" ?
          a.price > b.price
          ? 1 : -1
          : sort === "highest" ?
          a.price < b.price
          ? 1 : -1
          : a._id > b._id
          ? 1 : -1
      ))
    }));
  }

  

  filterProducts = (e) => {
    // impl
    console.log(e.target.value);
    if (e.target.value === "") {
      this.setState({size: e.target.value, product: data.products});
    }else{
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          product => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
   
  }

  render(){
    return (
      <div className="grid-container">
        {/* page header */}
        <header className="page-header">
          <a href="/">React Shopping Cart</a>
        </header>
  
        {/* page section */}
        <section className="page-section">
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                      size={this.state.size}
                      sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
              ></Filter>
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">
              Cart Items
            </div>
          </div>
        </section>
  
        {/* page footer */}
        <footer className="page-footer">
          All rights reserved.
        </footer>
      </div>
    );
  }
}

export default App;
