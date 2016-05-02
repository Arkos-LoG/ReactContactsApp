import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Layout from "./pages/Layout";
import NewContact from "./pages/NewContact";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Contacts}></IndexRoute>
      <Route path="newContact" component={NewContact}></Route>
      <Route path="about" component={About}></Route>
    </Route>
  </Router>,
app);
