import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import CreateProduct from './components/create-product.component'
import ShowProduct from './components/product-list.component'
import CustSearch from './components/customer-search.component'
import CustOrder from './components/cust-orders.component'
import Login from './components/login.component'
import Dispatch from './components/despatch-product.component'
import CustWaiting from './components/cust-show-waiting.component'
import reviewform from './components/reviewform.component'
import review from './components/review.component'
import Dispatched from './components/dispatched.component'
import logout from './components/logout.component'

let a = localStorage.getItem('logggedin');
console.log(a)

function App() {
  if (a != 1) {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
            <Link to="/" className="navbar-brand">ShowUsers</Link>
            <Link to="/create" className="navbar-brand">Register</Link>
            <Link to="/login" className="navbar-brand">Login</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Users</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create User</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={UsersList} />
          <Route path="/create" component={CreateUser} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    )
  }
  else {
    let type = localStorage.getItem('usertype')
    if (type == 'vendor') {
      return (
        <Router>
          <div className="container">
            <h1>Welcome Vendor {localStorage.getItem('username')} !</h1>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/showprod" className="navbar-brand">ShowProduct</Link>
              <Link to="/addprod" className="navbar-brand">AddProduct</Link>
              <Link to="/dispatch" className="navbar-brand">Dispatch</Link>
              <Link to="/dispatched" className="navbar-brand">Dispatched</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Users</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create User</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br />
            <Route path="/addprod" component={CreateProduct} />
            <Route path="/showprod" component={ShowProduct} />
            <Route path="/dispatch" component={Dispatch} />
            <Route path="/dispatched" component={Dispatched} />
            <Route path="/showrev" component={review} />

          </div>
        </Router>
      );
    }
    else {
      return (
        <Router>
          <div className="container">
            <h1>Welcome customer {localStorage.getItem('username')} !</h1>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/custsearch" className="navbar-brand">CustSearch</Link>
              <Link to="/custorder" className="navbar-brand">MyOrders</Link>
              <Link to="/custwaiting" className="navbar-brand">WaitingOrders</Link>
              <Link to="/logout" className="navbar-brand">Logout</Link>

              {/* <Link to="/showrev" className="navbar-brand">ShowRev</Link> */}
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Users</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create User</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br />
            <Route path="/custsearch" component={CustSearch} />
            <Route path="/custwaiting" component={CustWaiting} />
            <Route path="/custorder" component={CustOrder} />
            <Route path="/customerdet" component={reviewform} />
            <Route path="/showrev" component={review} />
            <Route path="/logout" component={logout} />
          </div>
        </Router>
      );
    }

  }
}



export default App;
