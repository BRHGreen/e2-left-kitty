import React, { Component } from "react";
import { hot } from "react-hot-loader";
import makeMainRoutes from "./routes/index";

// for future reference; you cannot use a function for the following, it must be a class.
class App extends Component {
  render() {
    return makeMainRoutes();
  }
}

export default hot(module)(App);
